import { DeleteRefreshTokenUseCase } from "@/domain/use-case/refresh-token/delete-refresh-token";
import { PrismaRefreshTokenRepository } from "@/infra/database/repositories/prisma-refresh-token-repository";

export function makeDeleteRefreshTokenUseCase() {
  const refreshTokenRepository = new PrismaRefreshTokenRepository();
  const refreshTokenUsecase = new DeleteRefreshTokenUseCase(
    refreshTokenRepository
  );

  return refreshTokenUsecase;
}
