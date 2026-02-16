import { AttachmentNotFoundError } from "@/domain/errors/attachment-not-found";
import { AttachmentLinkRepository } from "@/domain/repositories/attachment-link-repository";
import { $Enums } from "generated/prisma/client";

interface FindAttachmentByResourceRequest {
  resourceId: string;
  resourceType: $Enums.RESOURSE_TYPE;
}

export class FindAttachmentByResourceUseCase {
  constructor(private attachmentLinkRepository: AttachmentLinkRepository) {}

  async execute({ resourceId }: FindAttachmentByResourceRequest) {
    const attachmentLinks =
      await this.attachmentLinkRepository.findByResource(resourceId);

    if (!attachmentLinks || attachmentLinks.length === 0) {
      throw new AttachmentNotFoundError();
    }

    return { attachmentLinks };
  }
}
