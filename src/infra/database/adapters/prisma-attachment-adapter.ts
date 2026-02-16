import { Attachment } from "@/domain/entities/attachment";
import { Attachment as RowAttachments } from "generated/prisma/client";

export class PrismaAttachmentAdapter {
  static toPrisma({
    id,
    title,
    url,
    expiresAt,
    createdAt,
    status,
  }: Attachment) {
    return {
      id,
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
    return Attachment.create({ id, title, url, createdAt, expiresAt, status });
  }
}
