import { Product } from "@/domain/entities/product";
import {
  SearchManyProductsParams,
  ProductsRepository,
} from "@/domain/repositories/products-repository";
import { PrismaService } from "../prisma";
import { PrismaProductAttachmentAdapter } from "../adapters/prisma-product-attachment-adater";
import { Prisma, PRODUCT_CATEGORIES } from "generated/prisma/client";
import { PaginatedResponse } from "@/shared/paginated-response";
import { ProductWithAttachment } from "@/domain/entities/value-objects/product-with-attachment";
import { PrismaProductAdapter } from "../adapters/prisma-product-adapter";
import { PrismaProductWithAttachmentsAdapter } from "../adapters/prisma-product-with-attachments-adapter";
import { DomainEvents } from "@/domain/events/domain-events";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";

export class PrismaProductsRepository implements ProductsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    const product = await this.prisma.product.findFirst({
      where: { id },
    });

    if (!product) {
      return null;
    }

    return PrismaProductAdapter.toDomain(product);
  }

  async findByIdWithAttachment(id: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        productAttachments: {
          take: 1,
          where: { isMain: true },
          select: {
            productId: true,
            attachmentId: true,
            attachment: {
              select: {
                url: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      return null;
    }

    return PrismaProductWithAttachmentsAdapter.toDomain(product);
  }

  async searchMany({
    page,
    perPage,
    category,
    title,
    ingredients,
  }: SearchManyProductsParams): Promise<PaginatedResponse<Product>> {
    const searchConditions: Prisma.ProductWhereInput[] = [];

    if (category) {
      searchConditions.push({
        category,
      });
    }

    if (title) {
      searchConditions.push({
        title: {
          contains: title,
          mode: "insensitive",
        },
      });
    }

    if (ingredients && ingredients.length > 0) {
      searchConditions.push({
        ingredients: {
          hasSome: ingredients,
        },
      });
    }

    const where: Prisma.ProductWhereInput = {
      category,
      status: "ACTIVE",
      ...(searchConditions.length > 0 && {
        OR: searchConditions,
      }),
    };
    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,

        skip: (page - 1) * perPage,
        orderBy: {
          title: "desc",
        },
        take: perPage,
      }),
      this.prisma.product.count({ where }),
    ]);

    const hasMore = page * perPage < total;

    return {
      data: products.map(PrismaProductAdapter.toDomain),
      pagination: { total, hasMore, nextPage: hasMore ? page + 1 : null },
    };
  }

  async findActiveCategories(): Promise<PRODUCT_CATEGORIES[]> {
    const activeCategories = await this.prisma.product.groupBy({
      by: ["category"],
    });

    return activeCategories.map((c) => c.category as PRODUCT_CATEGORIES);
  }

  async searchManyWithAttachments(
    { page, perPage, category, title, ingredients }: SearchManyProductsParams,
    userId: string,
  ): Promise<PaginatedResponse<ProductWithAttachment>> {
    const searchConditions: Prisma.ProductWhereInput[] = [];

    if (category) {
      searchConditions.push({
        category,
      });
    }

    if (title) {
      searchConditions.push({
        title: {
          contains: title,
          mode: "insensitive",
        },
      });
    }

    if (ingredients && ingredients.length > 0) {
      searchConditions.push({
        ingredients: {
          hasSome: ingredients,
        },
      });
    }

    const where: Prisma.ProductWhereInput = {
      category,
      status: "ACTIVE",
      ...(searchConditions.length > 0 && {
        OR: searchConditions,
      }),
    };

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        include: {
          favorite: { where: { userId }, select: { id: true } },
          productAttachments: {
            take: 1,
            where: { isMain: true },
            select: {
              productId: true,
              attachmentId: true,

              attachment: {
                select: {
                  url: true,
                },
              },
            },
          },
        },
        skip: (page - 1) * perPage,
        orderBy: {
          title: "desc",
        },
        take: perPage,
      }),
      await this.prisma.product.count({
        where: { status: "ACTIVE" },
      }),
    ]);

    const hasMore = page * perPage < (total ?? 0);

    return {
      data: products.map(PrismaProductWithAttachmentsAdapter.toDomain),
      pagination: {
        total: total ?? 0,
        hasMore,
        nextPage: hasMore ? page + 1 : null,
      },
    };
  }

  async create(data: Product) {
    const product = PrismaProductAdapter.toPrisma(data);

    await this.prisma.$transaction(async (tx) => {
      await tx.product.create({
        data: product,
      });

      if (data.attachment) {
        const productAttachment = PrismaProductAttachmentAdapter.toPrisma(
          data.attachment,
        );

        await tx.productAttachment.create({
          data: productAttachment,
        });
      }
    });
  }

  async update(data: Product) {
    const product = PrismaProductAdapter.toPrisma(data);
    const productId = data.id.toString();
    const userId = data.userId.toString();

    const newAttachmentId = data.attachment?.attachmentId.toString();

    const existingProductAttachment =
      await this.prisma.productAttachment.findFirst({
        where: {
          productId,
        },
        include: { attachment: true },
      });

    const oldAttachmentId = existingProductAttachment?.attachmentId;
    const isNewAttachment = oldAttachmentId !== newAttachmentId;

    await this.prisma.$transaction(async (tx) => {
      await tx.product.update({
        where: { id: productId, userId: userId },
        data: {
          title: product.title,
          category: product.category,
          ingredients: product.ingredients,
          price: product.price,
          description: product.description,
          updatedAt: product.updatedAt,
        },
      });

      if (!isNewAttachment) return;

      if (oldAttachmentId) {
        await tx.productAttachment.deleteMany({
          where: {
            productId,
          },
        });
      }

      if (isNewAttachment && data.attachment) {
        const newAttachmentProduct = PrismaProductAttachmentAdapter.toPrisma(
          data.attachment,
        );

        await tx.productAttachment.create({
          data: newAttachmentProduct,
        });
      }
    });

    if (isNewAttachment && oldAttachmentId) {
      const remainingProducsAttachments =
        await this.prisma.productAttachment.count({
          where: { attachmentId: oldAttachmentId },
        });

      if (remainingProducsAttachments === 0 && existingProductAttachment) {
        DomainEvents.dispatchEventsForAggregate(data.id);

        await this.prisma.attachment.delete({
          where: { id: oldAttachmentId },
        });
      }
    }
  }

  async delete(id: string) {
    const productAttachment = await this.prisma.productAttachment.findFirst({
      where: {
        productId: id,
      },
      include: {
        attachment: true,
      },
    });

    if (productAttachment) {
      await this.prisma.attachment.delete({
        where: { id: productAttachment.attachmentId },
      });
    }

    await this.prisma.product.delete({
      where: {
        id,
      },
    });

    DomainEvents.dispatchEventsForAggregate(new UniqueEntityId(id));
  }
}
