import { CreateSnackUseCase } from "@/domain/use-case/snacks/create-snack";
import { PrismaService } from "@/infra/database/prisma";
import { PrismaSnacksRepository } from "@/infra/database/repositories/prisma-snacks-repository";

export function makeCreateSnackUseCase(prisma: PrismaService) {
  const snacksRepository = new PrismaSnacksRepository(prisma);
  const createSnackUsecase = new CreateSnackUseCase(snacksRepository);

  return createSnackUsecase;
}
