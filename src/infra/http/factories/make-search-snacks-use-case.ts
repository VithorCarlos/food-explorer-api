import { SearchSnackUseCase } from "@/domain/use-case/snacks/search-snack";
import { PrismaService } from "@/infra/database/prisma";
import { PrismaSnacksRepository } from "@/infra/database/repositories/prisma-snacks-repository";

export function makeSearchSnacksUseCase(prisma: PrismaService) {
  const snacksRepository = new PrismaSnacksRepository(prisma);
  const searchSnackUsecase = new SearchSnackUseCase(snacksRepository);

  return searchSnackUsecase;
}
