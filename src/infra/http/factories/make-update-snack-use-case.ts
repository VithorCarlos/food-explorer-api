import { UdpateSnackUseCase } from "@/domain/use-case/snacks/update-snack";
import { PrismaSnacksRepository } from "@/infra/database/repositories/prisma-snacks-repository";

export function makeUpdateSnackUseCase() {
  const snacksRepository = new PrismaSnacksRepository();
  const updateSnackUseCase = new UdpateSnackUseCase(snacksRepository);

  return updateSnackUseCase;
}
