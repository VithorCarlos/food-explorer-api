import { DeleteRefreshTokenUseCase } from "@/domain/use-case/refresh-token/delete-refresh-token";
import { PrismaService } from "@/infra/database/prisma";
import { PrismaRefreshTokenRepository } from "@/infra/database/repositories/prisma-refresh-token-repository";

export function makeDeleteRefreshTokenUseCase(prisma: PrismaService) {
  const refreshTokenRepository = new PrismaRefreshTokenRepository(prisma);
  const refreshTokenUsecase = new DeleteRefreshTokenUseCase(
    refreshTokenRepository,
  );

  return refreshTokenUsecase;
}
