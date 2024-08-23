import { RefreshToken } from "@/domain/entities/refresh-token";
import { RefreshTokenRepository } from "@/domain/repositories/refresh-token-repository";
import { prisma } from "../prisma";
import { PrismaRefreshTokenAdapter } from "../adapters/prisma-refresh-token-adapter";

export class PrismaRefreshTokenRepository implements RefreshTokenRepository {
  async findById(id: string) {
    const refreshToken = await prisma.refresh_tokens.findFirst({
      where: { id },
    });

    if (!refreshToken) {
      return null;
    }

    return PrismaRefreshTokenAdapter.toDomain(refreshToken);
  }

  async findByUserId(userId: string) {
    const refreshToken = await prisma.refresh_tokens.findFirst({
      where: { userId },
    });

    if (!refreshToken) {
      return null;
    }

    return PrismaRefreshTokenAdapter.toDomain(refreshToken);
  }

  async delete(id: string) {
    await prisma.refresh_tokens.delete({
      where: {
        id,
      },
    });
  }

  async create(data: RefreshToken) {
    const refreshToken = PrismaRefreshTokenAdapter.toPrisma(data);

    await prisma.refresh_tokens.create({ data: refreshToken });
  }
}
