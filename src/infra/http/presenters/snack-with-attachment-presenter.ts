import { SnackWithAttachment } from "@/domain/entities/value-objects/snack-with-attachment";

export class SnackWithAttachmentPresenter {
  static toHTTP(snackWithAttachment: SnackWithAttachment) {
    return {
      snackId: snackWithAttachment.snackId.toString(),
      attachmentUrl: snackWithAttachment.attachmentUrl,
      attachmentId: snackWithAttachment.attachmentId.toString(),
      userId: snackWithAttachment.userId.toString(),
      title: snackWithAttachment.title,
      description: snackWithAttachment.description,
      category: snackWithAttachment.category,
      ingredients: snackWithAttachment.ingredients,
      price: snackWithAttachment.price,
      createdAt: snackWithAttachment.createdAt,
      updatedAt: snackWithAttachment.updatedAt,
    };
  }
}
