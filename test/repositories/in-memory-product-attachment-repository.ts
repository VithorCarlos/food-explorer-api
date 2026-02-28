import { ProductAttachment } from "@/domain/entities/product-attachment";
import {
  ProductAttachmentDetails,
  ProductAttachmentRepository,
} from "@/domain/repositories/product-attachment-repository";
import { PrismaProductAttachmentAdapter } from "@/infra/database/adapters/prisma-product-attachment-adater";
import { InMemoryAttachmentRepository } from "./in-memory-attachment-repository";
import { Attachment } from "@/domain/entities/attachment";

export class InMemoryProductAttachmentRepository implements ProductAttachmentRepository {
  public items: ProductAttachment[] = [];

  constructor(private attachmentRepository: InMemoryAttachmentRepository) {}

  async create(productAttachment: ProductAttachment): Promise<void> {
    this.items.push(productAttachment);
  }

  async findByProductId(
    productId: string,
  ): Promise<ProductAttachmentDetails | null> {
    const item = this.items.find((item) => item.id.toString() === productId);

    if (!item) {
      return null;
    }

    const attachment = this.attachmentRepository.items.find((attachment) =>
      attachment.id.equals(item.id),
    ) as Attachment;

    return PrismaProductAttachmentAdapter.bind({
      id: item.id.toString(),
      attachmentId: item.attachmentId.toString(),
      isMain: item.isMain,
      position: item.position,
      productId: item.productId.toString(),
      attachment: {
        id: attachment.id.toString(),
        title: attachment.title,
        url: attachment.url,
        createdAt: attachment.createdAt,
      },
    });
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
