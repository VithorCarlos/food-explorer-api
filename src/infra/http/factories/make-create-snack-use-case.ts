import { CreateSnackUseCase } from "@/domain/use-case/snacks/create-snack";
import { PrismaService } from "@/infra/database/prisma";
import { PrismaAttachmentLinkRepository } from "@/infra/database/repositories/prisma-attachment-link-repository";
import { PrismaSnacksRepository } from "@/infra/database/repositories/prisma-snacks-repository";

export function makeCreateSnackUseCase(prisma: PrismaService) {
  const snacksRepository = new PrismaSnacksRepository(prisma);
  const attachmentLinkRepository = new PrismaAttachmentLinkRepository(prisma);
  const createSnackUsecase = new CreateSnackUseCase(
    snacksRepository,
    attachmentLinkRepository,
  );

  return createSnackUsecase;
}
