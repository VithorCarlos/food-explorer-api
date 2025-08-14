import { AttachmentLink } from "@/domain/entities/attachment-link";
import { attachment_link as RowAttachmentLink } from "@prisma/client";

export class PrismaAttachmentLinkAdapter {
  static toPrisma({
    attachmentId,
    resourceId,
    resourceType,
    linked_at,
  }: AttachmentLink) {
    return {
      attachmentId,
      resourceId,
      resourceType,
      linked_at,
    };
  }

  static toDomain({
    id,
    attachmentId,
    resourceId,
    resourceType,
  }: RowAttachmentLink) {
    return AttachmentLink.create({
      id,
      attachmentId,
      resourceId,
      resourceType,
    });
  }
}
