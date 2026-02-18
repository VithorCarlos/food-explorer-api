import { Attachment } from "@/domain/entities/attachment";
import { InvalidAttachmentTypeError } from "@/domain/errors/invalid-attachment-type";
import { AttachmentLinkRepository } from "@/domain/repositories/attachment-link-repository";
import { AttachmentRepository } from "@/domain/repositories/attachment-repository";
import { Uploader } from "@/domain/storage/uploader";
import dayjs from "dayjs";
import { ATTACHMENT_STATUS } from "generated/prisma/enums";

interface CreateAttachmentRequest {
  fileName: string;
  fileType: string;
  body: Buffer;
}

export class CreateAttachmentUseCase {
  constructor(
    private attachmentRepository: AttachmentRepository,
    private uploader: Uploader,
  ) {}

  async execute({ fileName, fileType, body }: CreateAttachmentRequest) {
    const allowedMimeTypes = /^image\/(jpeg|png|webp)$/;

    if (!allowedMimeTypes.test(fileType)) {
      throw new InvalidAttachmentTypeError();
    }

    const { url } = await this.uploader.upload({ fileName, fileType, body });

    const attachment = Attachment.create({
      title: fileName,
      url,
      status: ATTACHMENT_STATUS.PENDING,
    });

    await this.attachmentRepository.create(attachment);

    return { attachment };
  }
}
