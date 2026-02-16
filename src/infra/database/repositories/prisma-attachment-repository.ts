import { PrismaService } from "../prisma";
import { PrismaAttachmentAdapter } from "../adapters/prisma-attachment-adapter";
import { Attachment } from "@/domain/entities/attachment";
import { AttachmentRepository } from "@/domain/repositories/attachment-repository";

export class PrismaAttachmentRepository implements AttachmentRepository {
  constructor(private prisma: PrismaService) {}

  async create(attachment: Attachment) {
    const attachmentData = PrismaAttachmentAdapter.toPrisma(attachment);

    await this.prisma.attachment.create({
      data: attachmentData,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.attachment.delete({
      where: { id },
    });
  }
}
