import { prisma } from "../prisma";
import { PrismaAttachmentAdapter } from "../adapters/prisma-attachment-adapter";
import { Attachment } from "@/domain/entities/attachment";
import {
  AttachmentLinkWithAttachment,
  AttachmentRepository,
} from "@/domain/repositories/attachment-repository";

export class PrismaAttachmentRepository implements AttachmentRepository {
  async create(attachment: Attachment) {
    const attachmentLink = PrismaAttachmentAdapter.toPrisma(attachment);

    await prisma.attachment.create({
      data: {
        id: attachmentLink.id,
        title: attachmentLink.title,
        url: attachmentLink.url,
      },
    });
  }

  async findByResource({
    resourceId,
    resourceType,
  }: AttachmentLinkWithAttachment): Promise<Attachment[]> {
    const attachments = await prisma.attachment.findMany({
      where: {
        links: {
          some: {
            resourceId,
            resourceType,
          },
        },
      },
    });

    return attachments.map(PrismaAttachmentAdapter.toDomain);
  }
}
