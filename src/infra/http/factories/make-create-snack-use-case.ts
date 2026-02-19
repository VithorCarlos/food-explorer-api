import { CreateSnackUseCase } from "@/domain/use-case/snacks/create-snack";
import { PrismaService } from "@/infra/database/prisma";
import { PrismaSnacksRepository } from "@/infra/database/repositories/prisma-snacks-repository";
import { R2Storage } from "@/infra/storage/r2-storage";

export function makeCreateSnackUseCase(prisma: PrismaService) {
  const r2Storage = new R2Storage();
  const snacksRepository = new PrismaSnacksRepository(prisma, r2Storage);
  const createSnackUsecase = new CreateSnackUseCase(snacksRepository);

  return createSnackUsecase;
}
