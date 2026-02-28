import { Attachment, AttachmentProps } from "@/domain/entities/attachment";
import { ATTACHMENT_STATUS } from "@/domain/enums/attachment-status";
import { PrismaAttachmentAdapter } from "@/infra/database/adapters/prisma-attachment-adapter";
import { PrismaService } from "@/infra/database/prisma";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { faker } from "@faker-js/faker";

export function makeAttachment(
  data: Partial<AttachmentProps> = {},
  id?: UniqueEntityId,
) {
  const attachment = Attachment.create(
    {
      title: faker.lorem.slug() + ".png",
      url: faker.image.url(),
      status: data.status ?? ATTACHMENT_STATUS.PENDING,
      ...data,
    },
    id,
  );

  return attachment;
}

export class AttachmentFactory {
  constructor(private prisma: PrismaService) {}

  async makeAttachmentToPrisma(
    data: Partial<AttachmentProps> = {},
  ): Promise<Attachment> {
    const attachment = makeAttachment(data);

    await this.prisma.attachment.create({
      data: PrismaAttachmentAdapter.toPrisma(attachment),
    });

    return attachment;
  }
}
