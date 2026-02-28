import { ProductWithAttachment } from "@/domain/entities/value-objects/product-with-attachment";

export class ProductWithAttachmentPresenter {
  static toHTTP(productWithAttachment: ProductWithAttachment) {
    return {
      productId: productWithAttachment.productId.toString(),
      isFavorited: productWithAttachment.isFavorited,
      attachmentUrl: productWithAttachment.attachmentUrl,
      attachmentId: productWithAttachment.attachmentId?.toString(),
      userId: productWithAttachment.userId.toString(),
      title: productWithAttachment.title,
      description: productWithAttachment.description,
      category: productWithAttachment.category,
      ingredients: productWithAttachment.ingredients,
      price: productWithAttachment.price,
      createdAt: productWithAttachment.createdAt,
      updatedAt: productWithAttachment.updatedAt,
    };
  }
}
