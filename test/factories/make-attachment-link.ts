import {
  AttachmentLink,
  AttachmentLinkProps,
} from "@/domain/entities/attachment-link";

export function makeAttachmentLink(
  attachmentId: string,
  data: Partial<AttachmentLinkProps> = {},
) {
  const attachmentLink = AttachmentLink.create({
    attachmentId,
    resourceId: data.resourceId,
    resourceType: data.resourceType,
    linkedAt: new Date(Date.now()),
    ...data,
  });

  return attachmentLink;
}
