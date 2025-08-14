import { Attachment } from "../entities/attachment";
import { AttachmentLink } from "../entities/attachment-link";

export interface AttachmentRepository {
  create(attachment: Attachment): Promise<void>;
  createLink(link: AttachmentLink): Promise<void>;
  // findByResource(
  //   attachmentLink: AttachmentLinkWithAttachment
  // ): Promise<Attachment[]>;
}
