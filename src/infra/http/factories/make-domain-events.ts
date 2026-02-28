import { OnProductAttachmentChanged } from "@/domain/subscribers/on-product-attachment-changed";
import { PrismaService } from "@/infra/database/prisma";
import { PrismaProductAttachmentRepository } from "@/infra/database/repositories/prisma-product-attachment-repository";
import { R2Storage } from "@/infra/storage/r2-storage";

export function makeDomainEvents(prisma: PrismaService) {
  const uploader = new R2Storage();

  // Repositories
  const productAttachmentRepository = new PrismaProductAttachmentRepository(
    prisma,
  );

  // Domain Event Handlers
  const onProductAttachmentChanged = new OnProductAttachmentChanged(
    productAttachmentRepository,
    uploader,
  );

  onProductAttachmentChanged.setupSubscriptions();
}
