import { GenerateRefreshTokenUseCase } from "@/domain/use-case/refresh-token/generate-refresh-token";
import { PrismaRefreshTokenRepository } from "@/infra/database/repositories/prisma-refresh-token-repository";

export function makeGenerateRefreshTokenUseCase() {
  const refreshTokenRepository = new PrismaRefreshTokenRepository();
  const refreshTokenUsecase = new GenerateRefreshTokenUseCase(
    refreshTokenRepository
  );

  return refreshTokenUsecase;
}
