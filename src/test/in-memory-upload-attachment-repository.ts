import {
  AttachmentLinkWithAttachment,
  AttachmentRepository,
} from "@/domain/repositories/attachment-repository";
import { Attachment } from "@/domain/entities/attachment";

export class InMemoryUploadAttachment implements AttachmentRepository {
  public items: AttachmentLinkWithAttachment[] = [];

  async create(data: Attachment) {
    this.items.push(data);
  }

  async findByResource({
    resourceId,
    resourceType,
  }: AttachmentLinkWithAttachment): Promise<Attachment[]> {
    return this.items.filter(
      (item) =>
        item.resourceId === resourceId && item.resourceType === resourceType
    );
  }
}
