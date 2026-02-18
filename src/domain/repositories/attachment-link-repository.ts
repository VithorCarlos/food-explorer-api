import { AttachmentLink } from "../entities/attachment-link";

export interface AttachmentLinkRepository {
  createLink(link: AttachmentLink): Promise<void>;
  findByResource(resourceId: string): Promise<AttachmentLink[]>;
  findByAttachmentId(attachmentId: string): Promise<AttachmentLink[]>;
}
