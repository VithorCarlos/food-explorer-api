import { Attachment } from "@/domain/entities/attachment";
import { InvalidAttachmentTypeError } from "@/domain/errors/invalid-attachment-type";
import { AttachmentRepository } from "@/domain/repositories/attachment-repository";
import { Uploader } from "@/domain/storage/uploader";
import dayjs from "dayjs";

interface CreateAttachmentRequest {
  fileName: string;
  fileType: string;
  body: Buffer;
}

export class CreateAttachmentUseCase {
  constructor(
    private attachmentRepository: AttachmentRepository,
    private uploader: Uploader
  ) {}

  async execute({ fileName, fileType, body }: CreateAttachmentRequest) {
    const allowedMimeTypes = /^image\/(jpeg|png|webp)$/;

    if (!allowedMimeTypes.test(fileType)) {
      throw new InvalidAttachmentTypeError();
    }

    const { url } = await this.uploader.upload({ fileName, fileType, body });

    const expires_at = dayjs().add(1, "day").toDate();

    const attachment = Attachment.create({
      title: fileName,
      url,
      expires_at,
    });

    await this.attachmentRepository.create(attachment);

    return { attachment };
  }
}
