import { CreateAttachmentUseCase } from "@/domain/use-case/attachment/create-attachment";
import { PrismaService } from "@/infra/database/prisma";
import { PrismaAttachmentRepository } from "@/infra/database/repositories/prisma-attachment-repository";
import { R2Storage } from "@/infra/storage/r2-storage";

export function makeUploadAttachmentUseCase(prisma: PrismaService) {
  const uploadAttachmentRepository = new PrismaAttachmentRepository(prisma);

  const r2Storage = new R2Storage();

  const uploadAttachmentUseCase = new CreateAttachmentUseCase(
    uploadAttachmentRepository,
    r2Storage,
  );

  return uploadAttachmentUseCase;
}
