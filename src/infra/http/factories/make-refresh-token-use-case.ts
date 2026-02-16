import { RefreshTokenUseCase } from "@/domain/use-case/refresh-token/refresh-token";
import { PrismaService } from "@/infra/database/prisma";
import { PrismaRefreshTokenRepository } from "@/infra/database/repositories/prisma-refresh-token-repository";

export function makeRefreshTokenUseCase(prisma: PrismaService) {
  const refreshTokenRepository = new PrismaRefreshTokenRepository(prisma);
  const refreshTokenUsecase = new RefreshTokenUseCase(refreshTokenRepository);

  return refreshTokenUsecase;
}
