import { ProductAttachment } from "@/domain/entities/product-attachment";
import { ProductAttachmentRepository } from "@/domain/repositories/product-attachment-repository";

export class InMemoryProductAttachmentRepository implements ProductAttachmentRepository {
  public items: ProductAttachment[] = [];

  async create(productAttachment: ProductAttachment): Promise<void> {
    this.items.push(productAttachment);
  }

  async findByProductId(productId: string): Promise<ProductAttachment | null> {
    const item = this.items.find((item) => item.id.toString() === productId);

    if (!item) {
      return null;
    }

    return item;
  }

  async delete(productAttachment: ProductAttachment): Promise<void> {
    const itemIndex = this.items.findIndex((item) =>
      item.id.equals(productAttachment.id),
    );

    this.items.splice(itemIndex, 1);
  }

  async deleteByProductId(productId: string): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.productId.toString() === productId,
    );

    this.items.splice(itemIndex, 1);
  }
}
