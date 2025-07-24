import { FileTooLargeError } from "@/domain/errors/file-too-large";
import { FastifyReply, FastifyRequest } from "fastify";
import { pipeline } from "node:stream";
import { promisify } from "node:util";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { InvalidAttachmentTypeError } from "@/domain/errors/invalid-attachment-type";

export const uploadAttachment = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const data = await request.file();

    const pump = promisify(pipeline);

    if (!data) {
      return reply.status(400).send({ message: "Nenhum arquivo enviado" });
    }

    const uploadDir = path.join("tmp", "uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const extension = path.extname(data.filename);
    const filename = `${data.filename}-${Date.now()}${extension}`;
    const filepath = path.resolve("tmp/uploads", filename);

    const transformer = sharp()
      .resize({ width: 800 })
      .jpeg({ quality: 85 })
      .webp({ quality: 80 })
      .png({ quality: 85, compressionLevel: 8 });

    await pump(data.file, transformer, fs.createWriteStream(filepath));

    if (data.file.truncated) {
      return reply
        .status(400)
        .send({ message: "Arquivo muito grande (truncado)" });
    }

    const fileBuffer = fs.readFileSync(filepath);
    fs.unlinkSync(filepath);

    reply.status(201).send({ filename, filepath });
  } catch (error) {
    console.log(error);
    if (error instanceof InvalidAttachmentTypeError) {
      reply.status(400).send({ message: error.message });
    }

    if (error instanceof FileTooLargeError) {
      reply.status(400).send({ message: error.message });
    }
    throw error;
  }
};
