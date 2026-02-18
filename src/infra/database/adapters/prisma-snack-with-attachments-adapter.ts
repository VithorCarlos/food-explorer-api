import { SnackWithAttachment } from "@/domain/entities/value-objects/snack-with-attachment";
import { FOOD_CATEGORIES } from "@/domain/enums/food-categories";
import { env } from "@/env";

interface PrismaSnackWithAttachmentRaw {
  snack_id: string;
  title: string;
  description: string;
  category: string;
  ingredients: string[];
  price: number;
  user_id: string;
  created_at: Date;
  updated_at: Date;
  attachment_url: string | null;
}

export class PrismaSnackWithAttachmentsAdapter {
  static toDomain(
    snacksWithAttachmentsRaw: PrismaSnackWithAttachmentRaw,
  ): SnackWithAttachment {
    return SnackWithAttachment.create({
      snackId: snacksWithAttachmentsRaw.snack_id,
      attachmentUrl: snacksWithAttachmentsRaw.attachment_url
        ? `${env.CLOUDFARE_PUBLIC_CDN}/${snacksWithAttachmentsRaw.attachment_url}`
        : null,
      userId: snacksWithAttachmentsRaw.user_id,
      title: snacksWithAttachmentsRaw.title,
      category: snacksWithAttachmentsRaw.category as FOOD_CATEGORIES,
      description: snacksWithAttachmentsRaw.description,
      ingredients: snacksWithAttachmentsRaw.ingredients,
      price: snacksWithAttachmentsRaw.price,
      createdAt: snacksWithAttachmentsRaw.created_at,
      updatedAt: snacksWithAttachmentsRaw.updated_at,
    });
  }
}
