import { ProductWithAttachment } from "@/domain/entities/value-objects/product-with-attachment";
import { PRODUCT_CATEGORIES } from "@/domain/enums/product-categories";
import { PRODUCT_STATUS } from "@/domain/enums/product-status";
import { env } from "@/env";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { Decimal } from "generated/prisma/internal/prismaNamespace";

interface PrismaProductWithAttachmentRaw {
  productAttachments: {
    productId: string;
    attachmentId: string;
    attachment: {
      url: string;
    };
  }[];
  favorite?: {
    id: string;
  }[];
  category: keyof typeof PRODUCT_CATEGORIES;
  title: string;
  ingredients: string[];
  id: string;
  description: string | null;
  price: Decimal;
  status: keyof typeof PRODUCT_STATUS;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  userId: string;
}

export class PrismaProductWithAttachmentsAdapter {
  static toDomain(raw: PrismaProductWithAttachmentRaw): ProductWithAttachment {
    const attchment = raw.productAttachments[0]?.attachment;
    return ProductWithAttachment.create({
      productId: new UniqueEntityId(raw.id),
      ...(raw.favorite && { isFavorited: raw.favorite.length > 0 }),
      userId: new UniqueEntityId(raw.userId),
      title: raw.title,
      category: raw.category as PRODUCT_CATEGORIES,
      ...(raw.description && { description: raw.description }),
      ...(raw.ingredients?.length && { ingredients: raw.ingredients }),
      price: Number(raw.price),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      ...(attchment && {
        attachmentUrl: attchment.url
          ? `${env.CLOUDFARE_PUBLIC_CDN}/${attchment.url}`
          : null,
        attachmentId: new UniqueEntityId(
          raw.productAttachments[0]?.attachmentId,
        ),
      }),
    });
  }
}
