import { AttachmentNotFoundError } from "@/domain/errors/attachment-not-found";
import { AttachmentRepository } from "@/domain/repositories/attachment-repository";
import { $Enums } from "generated/prisma/client";

interface FindAttachmentByResourceRequest {
  resourceId: string;
  resourceType: $Enums.RESOURSE_TYPE;
}

export class FindAttachmentByResourceUseCase {
  constructor(private attachmentRepository: AttachmentRepository) {}

  async execute({ resourceId, resourceType }: FindAttachmentByResourceRequest) {
    const attachments = await this.attachmentRepository.findByResource(
      resourceId,
      resourceType,
    );

    if (!attachments || attachments.length === 0) {
      throw new AttachmentNotFoundError();
    }

    return { attachments };
  }
}
