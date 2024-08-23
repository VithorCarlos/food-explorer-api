import { RefreshTokenUseCase } from "@/domain/use-case/refresh-token/refresh-token-use-case";
import { PrismaRefreshTokenRepository } from "@/infra/database/repositories/prisma-refresh-token-repository";

export function makeRefreshTokenUseCase() {
  const refreshTokenRepository = new PrismaRefreshTokenRepository();
  const refreshTokenUsecase = new RefreshTokenUseCase(refreshTokenRepository);

  return refreshTokenUsecase;
}
