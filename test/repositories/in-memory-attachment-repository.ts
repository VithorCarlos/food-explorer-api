import { AttachmentRepository } from "@/domain/repositories/attachment-repository";
import { Attachment } from "@/domain/entities/attachment";

export class InMemoryAttachmentRepository implements AttachmentRepository {
  public items: Attachment[] = [];

  async findById(id: string): Promise<Attachment | null> {
    const item = this.items.find((item) => item.id.toString() === id);

    if (!item) {
      return null;
    }

    return item;
  }

  async create(data: Attachment) {
    this.items.push(data);
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter(
      (attachment) => attachment.id.toString() !== id,
    );
  }
}
