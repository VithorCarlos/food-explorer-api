import { Product } from "@/domain/entities/product";
import { ProductAttachment } from "@/domain/entities/product-attachment"; // Certifique-se deste import!
import { PRODUCT_CATEGORIES } from "@/domain/enums/product-categories";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import {
  Prisma,
  Product as RowProducts,
  $Enums,
} from "generated/prisma/client";

type PrismaProductWithRelations = RowProducts & {
  productAttachments?: {
    attachmentId: string;
    productId: string;
    isMain?: boolean;
    position?: number;
  }[];
};

export class PrismaProductAdapter {
  static toPrisma({
    id,
    title,
    category,
    ingredients,
    userId,
    price,
    description,
    updatedAt,
    createdAt,
  }: Product): Prisma.ProductUncheckedCreateInput {
    return {
      id: id.toString(),
      title,
      category: category as $Enums.PRODUCT_CATEGORIES,
      ingredients,
      userId: userId.toString(),
      price,
      ...(description && { description }),
      createdAt,
      updatedAt,
    };
  }

  static toDomain(raw: PrismaProductWithRelations) {
    const mainPrismaAttachment = raw.productAttachments?.[0];

    return Product.create(
      {
        title: raw.title,
        category: raw.category as PRODUCT_CATEGORIES,
        ingredients: raw.ingredients,
        userId: new UniqueEntityId(raw.userId),
        price: Number(raw.price),
        ...(raw.description && { description: raw.description }),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,

        ...(mainPrismaAttachment && {
          attachment: ProductAttachment.create({
            attachmentId: new UniqueEntityId(mainPrismaAttachment.attachmentId),
            productId: new UniqueEntityId(mainPrismaAttachment.productId),
            isMain: mainPrismaAttachment.isMain ?? true,
            position: mainPrismaAttachment.position ?? 0,
          }),
        }),
      },
      new UniqueEntityId(raw.id),
    );
  }
}
