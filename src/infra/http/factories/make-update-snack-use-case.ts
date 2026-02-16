import { UdpateSnackUseCase } from "@/domain/use-case/snacks/update-snack";
import { PrismaService } from "@/infra/database/prisma";
import { PrismaSnacksRepository } from "@/infra/database/repositories/prisma-snacks-repository";

export function makeUpdateSnackUseCase(prisma: PrismaService) {
  const snacksRepository = new PrismaSnacksRepository(prisma);
  const updateSnackUseCase = new UdpateSnackUseCase(snacksRepository);

  return updateSnackUseCase;
}
