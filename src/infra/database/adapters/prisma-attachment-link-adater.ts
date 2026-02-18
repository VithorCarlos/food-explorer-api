import { AttachmentLink } from "@/domain/entities/attachment-link";
import { AttachmentLink as RowAttachmentLink } from "generated/prisma/client";

export class PrismaAttachmentLinkAdapter {
  static toPrisma({
    attachmentId,
    resourceId,
    resourceType,
    linkedAt,
  }: AttachmentLink) {
    return {
      attachmentId,
      resourceId,
      resourceType,
      linkedAt,
    };
  }

  static toDomain({
    id,
    attachmentId,
    resourceId,
    resourceType,
    linkedAt,
  }: RowAttachmentLink) {
    return AttachmentLink.create({
      id,
      attachmentId,
      resourceId,
      resourceType,
      linkedAt: linkedAt ?? null,
    });
  }
}
