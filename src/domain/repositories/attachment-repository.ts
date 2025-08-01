import { Attachment } from "../entities/attachment";
import { $Enums } from "@/prisma/generated";

export interface AttachmentLinkWithAttachment extends Attachment {
  resourceId?: string;
  resourceType?: $Enums.RESOURSE_TYPE;
}

export interface AttachmentRepository {
  create(attachment: AttachmentLinkWithAttachment): Promise<void>;
  findByResource(
    attachmentLink: AttachmentLinkWithAttachment
  ): Promise<Attachment[]>;
}
