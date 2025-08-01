import { FileTooLargeError } from "@/domain/errors/file-too-large";
import { FastifyReply, FastifyRequest } from "fastify";

import { InvalidAttachmentTypeError } from "@/domain/errors/invalid-attachment-type";
import { makeUploadAttachmentUseCase } from "../../factories/make-upload-attachment-use-case";
import { AttachmentNotFoundError } from "@/domain/errors/attachment-not-found";

export const uploadAttachment = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const data = await request.file();

    if (!data) {
      throw new AttachmentNotFoundError();
    }

    if (data.file.truncated) {
      throw new FileTooLargeError();
    }

    const uploadAttachmentUseCase = makeUploadAttachmentUseCase();
    const fileBuffer = await data.toBuffer();

    const { attachment } = await uploadAttachmentUseCase.execute({
      body: fileBuffer,
      fileName: data.filename,
      fileType: data.mimetype,
    });

    reply.status(201).send({ attachmentId: attachment.id });
  } catch (error: any) {
    if (error instanceof AttachmentNotFoundError) {
      reply.status(400).send({ message: error.message });
    }

    if (error instanceof InvalidAttachmentTypeError) {
      reply.status(400).send({ message: error.message });
    }

    if (error.code === "FST_REQ_FILE_TOO_LARGE") {
      reply.status(400).send({ message: new FileTooLargeError().message });
    }

    throw error;
  }
};
