import { Attachment } from "@/domain/entities/attachment";
import { InvalidAttachmentTypeError } from "@/domain/errors/invalid-attachment-type";
import { AttachmentRepository } from "@/domain/repositories/attachment-repository";
import { Uploader } from "@/domain/storage/uploader";

interface CreateUploadAttachmentRequest {
  fileName: string;
  fileType: string;
  body: Buffer;
}

export class CreateUploadAttachmentUseCase {
  constructor(
    private attachmentRepository: AttachmentRepository,
    private uploader: Uploader
  ) {}

  async execute({ fileName, fileType, body }: CreateUploadAttachmentRequest) {
    const allowedMimeTypes = /^image\/(jpeg|png|webp)$/;

    if (!allowedMimeTypes.test(fileType)) {
      throw new InvalidAttachmentTypeError();
    }

    const { url } = await this.uploader.upload({ fileName, fileType, body });

    const attachment = Attachment.create({
      title: fileName,
      url,
    });

    await this.attachmentRepository.create(attachment);

    return { attachment };
  }
}
