import { CreateSnackUseCase } from "@/domain/use-case/snacks/create-snack";
import { PrismaSnacksRepository } from "@/infra/database/repositories/prisma-snacks-repository";

export function makeCreateSnackUseCase() {
  const snacksRepository = new PrismaSnacksRepository();
  const createSnackUsecase = new CreateSnackUseCase(snacksRepository);

  return createSnackUsecase;
}
