import { ProductWithAttachment } from "@/domain/entities/value-objects/product-with-attachment";
import { PRODUCT_CATEGORIES } from "@/domain/enums/product-categories";
import { env } from "@/env";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";

interface PrismaProductWithAttachmentRaw {
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
}

export class PrismaProductWithAttachmentsAdapter {
  static toDomain(raw: PrismaProductWithAttachmentRaw): ProductWithAttachment {
    return ProductWithAttachment.create({
      productId: new UniqueEntityId(raw.product_id),
      attachmentUrl: raw.attachment_url
        ? `${env.CLOUDFARE_PUBLIC_CDN}/${raw.attachment_url}`
        : null,
      attachmentId: new UniqueEntityId(raw.attachment_id),
      userId: new UniqueEntityId(raw.user_id),
      title: raw.title,
      category: raw.category as PRODUCT_CATEGORIES,
      description: raw.description,
      ingredients: raw.ingredients,
      price: raw.price,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
    });
  }
}
