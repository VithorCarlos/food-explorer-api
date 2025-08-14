import { CreateSnackUseCase } from "@/domain/use-case/snacks/create-snack";
import { PrismaAttachmentRepository } from "@/infra/database/repositories/prisma-attachment-repository";
import { PrismaSnacksRepository } from "@/infra/database/repositories/prisma-snacks-repository";

export function makeCreateSnackUseCase() {
  const snacksRepository = new PrismaSnacksRepository();
  const attachmentRepository = new PrismaAttachmentRepository();
  const createSnackUsecase = new CreateSnackUseCase(
    snacksRepository,
    attachmentRepository
  );

  return createSnackUsecase;
}
