import { Attachment } from "@/domain/entities/attachment";
import { attachment as RowAttachments } from "@prisma/client";

export class PrismaAttachmentAdapter {
  static toPrisma({ id, title, url, expires_at, created_at }: Attachment) {
    return {
      id,
      title,
      url,
      expires_at,
      created_at,
    };
  }

  static toDomain({ id, title, url, created_at, expires_at }: RowAttachments) {
    return Attachment.create({ id, title, url, created_at, expires_at });
  }
}
