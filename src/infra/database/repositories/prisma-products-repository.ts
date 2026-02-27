import { Product } from "@/domain/entities/product";
import {
  SearchManyProductsParams,
  ProductsRepository,
} from "@/domain/repositories/products-repository";
import { PrismaService } from "../prisma";
import { PrismaAttachmentLinkAdapter } from "../adapters/prisma-attachment-link-adater";
import {
  ATTACHMENT_STATUS,
  Prisma,
  PRODUCT_CATEGORIES,
  RESOURSE_TYPE,
} from "generated/prisma/client";
import { Uploader } from "@/domain/storage/uploader";
import { PaginatedResponse } from "@/shared/paginated-response";
import { ProductWithAttachment } from "@/domain/entities/value-objects/product-with-attachment";
import { PrismaProductAdapter } from "../adapters/prisma-product-adapter";
import { PrismaProductWithAttachmentsAdapter } from "../adapters/prisma-product-with-attachments-adapter";

export class PrismaProductsRepository implements ProductsRepository {
  constructor(
    private prisma: PrismaService,
    private uploader: Uploader,
  ) {}

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
    const products = await this.prisma.$queryRaw<
      {
        product_id: string;
        title: string;
        description: string;
        category: string;
        ingredients: string[];
        price: number;
        user_id: string;
        created_at: Date;
        updated_at: Date;
        attachment_url: string | null;
        attachment_id: string;
      }[]
    >(
      Prisma.sql`
      SELECT 
        s.id as product_id,
        s.title,
        s.description,
        s.category,
        s.ingredients,
        s.price,
        s.user_id,
        s.created_at,
        s.updated_at,
        al.attachment_id,
        a.url as attachment_url
      FROM products s
      LEFT JOIN attachment_link al 
        ON al.resource_id = s.id
        AND al.resource_type = 'PRODUCT'
      LEFT JOIN attachment a
        ON a.id = al.attachment_id
      WHERE s.id = ${id}
      `,
    );

    if (products.length === 0) {
      return null;
    }

    return PrismaProductWithAttachmentsAdapter.toDomain(products[0]);
  }

  async searchMany({
    page,
    perPage,
    category,
    title,
    ingredients,
  }: SearchManyProductsParams): Promise<PaginatedResponse<Product>> {
    const searchConditions = [];

    if (title) {
      searchConditions.push({
        title: {
          contains: title,
        },
      });
    }

    if (ingredients) {
      searchConditions.push({
        ingredients: {
          hasSome: ingredients,
        },
      });
    }
    const where = {
      category,
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

  async searchManyWithAttachments({
    page,
    perPage,
    category,
    title,
    ingredients,
  }: SearchManyProductsParams): Promise<
    PaginatedResponse<ProductWithAttachment>
  > {
    const andConditions: Prisma.Sql[] = [];

    if (category) {
      andConditions.push(
        Prisma.sql`LOWER(s.category) = ${category.toLowerCase()}`,
      );
    }

    const searchConditions: Prisma.Sql[] = [];

    if (title) {
      const cleanTitle = `%${title.trim().toLowerCase()}%`;
      searchConditions.push(Prisma.sql`LOWER(s.title) LIKE ${cleanTitle}`);
    }

    if (ingredients && ingredients.length > 0) {
      const ingredientsSql = ingredients.map((ing) => {
        const cleanIng = `%${ing.trim().toLowerCase()}%`;

        return Prisma.sql`LOWER(array_to_string(s.ingredients, ',')) LIKE ${cleanIng}`;
      });

      searchConditions.push(
        Prisma.sql`(${Prisma.join(ingredientsSql, " OR ")})`,
      );
    }

    if (searchConditions.length > 0) {
      andConditions.push(
        Prisma.sql`(${Prisma.join(searchConditions, " OR ")})`,
      );
    }

    const whereClause =
      andConditions.length > 0
        ? Prisma.sql`WHERE ${Prisma.join(andConditions, " AND ")}`
        : Prisma.sql``;

    const [productsWithAttachment, totalResult] = await Promise.all([
      this.prisma.$queryRaw<
        {
          product_id: string;
          title: string;
          description: string;
          category: string;
          ingredients: string[];
          price: number;
          user_id: string;
          created_at: Date;
          updated_at: Date;
          attachment_url: string | null;
          attachment_id: string;
        }[]
      >(Prisma.sql`
      SELECT 
        s.id as product_id,
        s.title,
        s.description,
        s.category,
        s.ingredients,
        s.price,
        s.user_id,
        s.created_at,
        s.updated_at,
        al.attachment_id,
        a.url as attachment_url
      FROM products s
      LEFT JOIN attachment_link al 
        ON al.resource_id = s.id
        AND al.resource_type = 'PRODUCT'
      LEFT JOIN attachment a
        ON a.id = al.attachment_id
      ${whereClause}
      ORDER BY s.title DESC
      LIMIT ${perPage}
      OFFSET ${(page - 1) * perPage}
      `),

      //get total count
      this.prisma.$queryRaw<{ total: bigint }[]>(Prisma.sql`
        SELECT COUNT(*) as total
        FROM products s
        ${whereClause}
      `),
    ]);

    const hasMore = page * perPage < (totalResult[0].total ?? 0);

    return {
      data: productsWithAttachment.map(
        PrismaProductWithAttachmentsAdapter.toDomain,
      ),
      pagination: {
        total: Number(totalResult[0].total) ?? 0,
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

      if (data.attachmentLink) {
        const attachmentLink = PrismaAttachmentLinkAdapter.toPrisma(
          data.attachmentLink,
        );

        await tx.attachmentLink.create({
          data: attachmentLink,
        });

        await tx.attachment.update({
          where: {
            id: attachmentLink.attachmentId,
          },
          data: { expiresAt: null, status: ATTACHMENT_STATUS.LINKED },
        });
      }
    });
  }

  async update(data: Product) {
    const product = PrismaProductAdapter.toPrisma(data);
    const productId = data.id.toString();
    const userId = data.userId.toString();

    const newAttachmentId = data.attachmentLink?.attachmentId.toString();

    const existingLink = await this.prisma.attachmentLink.findFirst({
      where: {
        resourceId: productId,
        resourceType: RESOURSE_TYPE.PRODUCT,
      },
      include: { attachment: true },
    });

    const oldAttachmentId = existingLink?.attachmentId;
    const oldAttachmentUrl = existingLink?.attachment?.url;
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

      if (isNewAttachment) {
        await tx.attachmentLink.deleteMany({
          where: {
            resourceId: productId,
            resourceType: RESOURSE_TYPE.PRODUCT,
          },
        });

        if (oldAttachmentId) {
          await tx.attachment.delete({
            where: { id: oldAttachmentId },
          });
        }

        if (data.attachmentLink) {
          const newAttachmentLink = PrismaAttachmentLinkAdapter.toPrisma(
            data.attachmentLink,
          );
          await tx.attachmentLink.create({
            data: newAttachmentLink,
          });

          await tx.attachment.update({
            where: { id: newAttachmentId },
            data: {
              expiresAt: null,
              status: ATTACHMENT_STATUS.LINKED,
            },
          });
        }
      }
    });

    if (isNewAttachment && oldAttachmentUrl) {
      await this.uploader.delete({ key: oldAttachmentUrl });
    }
  }

  async delete(id: string) {
    const attachmentLink = await this.prisma.attachmentLink.findFirst({
      where: {
        resourceId: id,
        resourceType: RESOURSE_TYPE.PRODUCT,
      },
      include: {
        attachment: true,
      },
    });

    if (attachmentLink) {
      await Promise.all([
        this.prisma.attachment.delete({
          where: { id: attachmentLink.attachmentId },
        }),
        this.uploader.delete({ key: attachmentLink.attachment.url }),
      ]);
    }

    await this.prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
