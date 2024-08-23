import { GenerateRefreshTokenUseCase } from "@/domain/use-case/refresh-token/generate-refresh-token-use-case";
import { PrismaRefreshTokenRepository } from "@/infra/database/repositories/prisma-refresh-token-repository";
import { PrismaUsersRepository } from "@/infra/database/repositories/prisma-users-repository";

export function makeGenerateRefreshTokenUseCase() {
  const refreshTokenRepository = new PrismaRefreshTokenRepository();
  const usersRepository = new PrismaUsersRepository();
  const refreshTokenUsecase = new GenerateRefreshTokenUseCase(
    refreshTokenRepository,
    usersRepository
  );

  return refreshTokenUsecase;
}
