import { AttachmentRepository } from "@/domain/repositories/attachment-repository";
import { Attachment } from "@/domain/entities/attachment";

export class InMemoryUploadAttachment implements AttachmentRepository {
  public items: Attachment[] = [];

  async create(data: Attachment) {
    this.items.push(data);
  }
}
