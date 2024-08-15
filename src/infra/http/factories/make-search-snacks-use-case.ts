import { SearchSnackUseCase } from "@/domain/use-case/snacks/search-snack";
import { PrismaSnacksRepository } from "@/infra/database/repositories/prisma-snacks-repository";

export function makeSearchSnacksUseCase() {
  const snacksRepository = new PrismaSnacksRepository();
  const searchSnackUsecase = new SearchSnackUseCase(snacksRepository);

  return searchSnackUsecase;
}
