import { AttachmentLink } from "@/domain/entities/attachment-link";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import {
  Prisma,
  AttachmentLink as RowAttachmentLink,
} from "generated/prisma/client";

export class PrismaAttachmentLinkAdapter {
  static toPrisma({
    attachmentId,
    resourceId,
    resourceType,
    linkedAt,
  }: AttachmentLink): Prisma.AttachmentLinkUncheckedCreateInput {
    return {
      attachmentId: attachmentId.toString(),
      resourceId: resourceId.toString(),
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
    return AttachmentLink.create(
      {
        attachmentId: new UniqueEntityId(attachmentId),
        resourceId: new UniqueEntityId(resourceId),
        resourceType,
        linkedAt: linkedAt ?? null,
      },
      new UniqueEntityId(id),
    );
  }
}
