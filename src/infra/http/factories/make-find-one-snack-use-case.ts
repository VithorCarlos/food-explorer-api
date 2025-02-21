import { FindOneSnackUseCase } from "@/domain/use-case/snacks/find-one-snack";
import { PrismaSnacksRepository } from "@/infra/database/repositories/prisma-snacks-repository";

export function makeFindOneSnackUseCase() {
  const snacksRepository = new PrismaSnacksRepository();
  const findoneSnackUseCase = new FindOneSnackUseCase(snacksRepository);

  return findoneSnackUseCase;
}
