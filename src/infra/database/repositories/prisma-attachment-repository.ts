import { prisma } from "../prisma";
import { PrismaAttachmentAdapter } from "../adapters/prisma-attachment-adapter";
import { Attachment } from "@/domain/entities/attachment";
import { AttachmentRepository } from "@/domain/repositories/attachment-repository";
import { AttachmentLink } from "@/domain/entities/attachment-link";
import { PrismaAttachmentLinkAdapter } from "../adapters/prisma-attachment-link-adater";

export class PrismaAttachmentRepository implements AttachmentRepository {
  async create(attachment: Attachment) {
    const attachmentData = PrismaAttachmentAdapter.toPrisma(attachment);

    await prisma.attachment.create({
      data: attachmentData,
    });
  }

  async createLink(link: AttachmentLink): Promise<void> {
    const attachmentLink = PrismaAttachmentLinkAdapter.toPrisma(link);

    console.log({ attachmentLink });

    await prisma.attachment_link.create({
      data: attachmentLink,
    });
  }

  // async findByResource({
  //   resourceId,
  //   resourceType,
  // }: AttachmentLinkWithAttachment): Promise<Attachment[]> {
  //   const attachments = await prisma.attachment.findMany({
  //     where: {
  //       links: {
  //         some: {
  //           resourceId,
  //           resourceType,
  //         },
  //       },
  //     },
  //   });

  //   return attachments.map(PrismaAttachmentAdapter.toDomain);
  // }
}
