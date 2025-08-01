import { CreateAttachmentUseCase } from "@/domain/use-case/attachment/create-attachment";
import { PrismaAttachmentRepository } from "@/infra/database/repositories/prisma-attachment-repository";
import { LocalStorage } from "@/infra/storage/local-storage";
import { R2Storage } from "@/infra/storage/r2-storage";

export function makeUploadAttachmentUseCase() {
  const uploadAttachmentRepository = new PrismaAttachmentRepository();

  const r2Storage = new R2Storage();

  const uploadAttachmentUseCase = new CreateAttachmentUseCase(
    uploadAttachmentRepository,
    r2Storage
  );

  return uploadAttachmentUseCase;
}
