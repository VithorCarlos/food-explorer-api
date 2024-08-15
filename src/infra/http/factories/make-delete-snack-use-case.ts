import { DeleteSnackUseCase } from "@/domain/use-case/snacks/delete-snack";
import { PrismaSnacksRepository } from "@/infra/database/repositories/prisma-snacks-repository";

export function makeDeleteSnackUseCase() {
  const snacksRepository = new PrismaSnacksRepository();
  const deleteSnackUseCase = new DeleteSnackUseCase(snacksRepository);

  return deleteSnackUseCase;
}
