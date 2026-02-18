import { AttachmentLink } from "@/domain/entities/attachment-link";
import { AttachmentLinkRepository } from "@/domain/repositories/attachment-link-repository";

export class InMemoryAttachmentLinkRepository implements AttachmentLinkRepository {
  public items: AttachmentLink[] = [];

  async createLink(link: AttachmentLink): Promise<void> {
    this.items.push(link);
  }

  async findByResource(resourceId: string): Promise<AttachmentLink[]> {
    return this.items.filter(
      (link) => link.resourceId.toString() === resourceId,
    );
  }

  async findByAttachmentId(attachmentId: string): Promise<AttachmentLink[]> {
    return this.items.filter(
      (link) => link.attachmentId.toString() === attachmentId,
    );
  }
}
