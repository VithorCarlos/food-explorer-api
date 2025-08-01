import { Attachment } from "@/domain/entities/attachment";
import { attachment as RowAttachments } from "@/prisma/generated";

export class PrismaAttachmentAdapter {
  static toPrisma({ id, title, url }: Attachment) {
    return {
      id,
      title,
      url,
    };
  }

  static toDomain({ id, title, url }: RowAttachments) {
    return Attachment.create({ id, title, url });
  }
}
