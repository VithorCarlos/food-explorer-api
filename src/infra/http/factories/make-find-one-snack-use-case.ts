import { FindOneSnackUseCase } from "@/domain/use-case/snacks/find-one-snack";
import { PrismaService } from "@/infra/database/prisma";
import { PrismaSnacksRepository } from "@/infra/database/repositories/prisma-snacks-repository";

export function makeFindOneSnackUseCase(prisma: PrismaService) {
  const snacksRepository = new PrismaSnacksRepository(prisma);
  const findoneSnackUseCase = new FindOneSnackUseCase(snacksRepository);

  return findoneSnackUseCase;
}
