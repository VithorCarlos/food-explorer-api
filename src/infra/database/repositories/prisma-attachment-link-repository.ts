import { AttachmentLinkRepository } from "@/domain/repositories/attachment-link-repository";
import { PrismaAttachmentLinkAdapter } from "../adapters/prisma-attachment-link-adater";
import { AttachmentLink } from "@/domain/entities/attachment-link";
import { PrismaService } from "../prisma";

export class PrismaAttachmentLinkRepository implements AttachmentLinkRepository {
  constructor(private prisma: PrismaService) {}

  async createLink(link: AttachmentLink): Promise<void> {
    const attachmentLink = PrismaAttachmentLinkAdapter.toPrisma(link);

    await this.prisma.attachmentLink.create({
      data: attachmentLink,
    });
  }

  async findByResource(resourceId: string): Promise<AttachmentLink[]> {
    const attachmentsLink = await this.prisma.attachmentLink.findMany({
      where: {
        resourceId,
      },
    });

    return attachmentsLink.map(PrismaAttachmentLinkAdapter.toDomain);
  }
}
