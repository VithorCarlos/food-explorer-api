import { AttachmentRepository } from "@/domain/repositories/attachment-repository";
import { Attachment } from "@/domain/entities/attachment";

export class InMemoryAttachmentRepository implements AttachmentRepository {
  public items: Attachment[] = [];

  async create(data: Attachment) {
    this.items.push(data);
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter(
      (attachment) => attachment.id.toString() !== id,
    );
  }
}
