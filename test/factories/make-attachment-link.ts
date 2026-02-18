import {
  AttachmentLink,
  AttachmentLinkProps,
} from "@/domain/entities/attachment-link";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { RESOURSE_TYPE } from "generated/prisma/enums";

export function makeAttachmentLink(
  attachmentId: UniqueEntityId,
  data: Partial<AttachmentLinkProps> = {},
) {
  const attachmentLink = AttachmentLink.create({
    attachmentId,
    resourceId: data.resourceId!,
    resourceType: data.resourceType as RESOURSE_TYPE,
    linkedAt: new Date(Date.now()),
    ...data,
  });

  return attachmentLink;
}
