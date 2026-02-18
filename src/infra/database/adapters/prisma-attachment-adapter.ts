import { Attachment } from "@/domain/entities/attachment";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { Prisma, Attachment as RowAttachments } from "generated/prisma/client";

export class PrismaAttachmentAdapter {
  static toPrisma({
    id,
    title,
    url,
    expiresAt,
    createdAt,
    status,
  }: Attachment): Prisma.AttachmentUncheckedCreateInput {
    return {
      id: id.toString(),
      title,
      url,
      expiresAt,
      createdAt,
      status,
    };
  }

  static toDomain({
    id,
    title,
    url,
    createdAt,
    expiresAt,
    status,
  }: RowAttachments) {
    return Attachment.create(
      {
        title,
        url,
        createdAt,
        expiresAt,
        status,
      },
      new UniqueEntityId(id),
    );
  }
}
