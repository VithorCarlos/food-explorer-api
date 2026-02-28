import { OnProductAttachmentChanged } from "@/domain/subscribers/on-product-attachment-changed";
import { PrismaService } from "@/infra/database/prisma";
import { PrismaAttachmentRepository } from "@/infra/database/repositories/prisma-attachment-repository";
import { R2Storage } from "@/infra/storage/r2-storage";

export function makeDomainEvents(prisma: PrismaService) {
  const uploader = new R2Storage();

  // Repositories
  const attachmentRepository = new PrismaAttachmentRepository(prisma);

  // Domain Event Handlers
  new OnProductAttachmentChanged(attachmentRepository, uploader);
}
