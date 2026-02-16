import { DeleteSnackUseCase } from "@/domain/use-case/snacks/delete-snack";
import { PrismaService } from "@/infra/database/prisma";
import { PrismaSnacksRepository } from "@/infra/database/repositories/prisma-snacks-repository";

export function makeDeleteSnackUseCase(prisma: PrismaService) {
  const snacksRepository = new PrismaSnacksRepository(prisma);
  const deleteSnackUseCase = new DeleteSnackUseCase(snacksRepository);

  return deleteSnackUseCase;
}
