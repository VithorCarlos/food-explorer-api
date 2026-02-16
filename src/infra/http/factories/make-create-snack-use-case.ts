import { CreateSnackUseCase } from "@/domain/use-case/snacks/create-snack";
import { PrismaService } from "@/infra/database/prisma";
import { PrismaAttachmentRepository } from "@/infra/database/repositories/prisma-attachment-repository";
import { PrismaSnacksRepository } from "@/infra/database/repositories/prisma-snacks-repository";

export function makeCreateSnackUseCase(prisma: PrismaService) {
  const snacksRepository = new PrismaSnacksRepository(prisma);
  const attachmentRepository = new PrismaAttachmentRepository(prisma);
  const createSnackUsecase = new CreateSnackUseCase(
    snacksRepository,
    attachmentRepository,
  );

  return createSnackUsecase;
}
