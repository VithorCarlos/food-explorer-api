import { AttachmentRepository } from "@/domain/repositories/attachment-repository";
import { Attachment } from "@/domain/entities/attachment";
import { AttachmentLink } from "@/domain/entities/attachment-link";

export class InMemoryUploadAttachment implements AttachmentRepository {
  createLink(link: AttachmentLink): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public items: Attachment[] = [];

  async create(data: Attachment) {
    this.items.push(data);
  }

  // async findByResource({
  //   resourceId,
  //   resourceType,
  // }: AttachmentLinkWithAttachment): Promise<Attachment[]> {
  //   return this.items.filter(
  //     (item) =>
  //       item.resourceId === resourceId && item.resourceType === resourceType,
  //   );
  // }
}
