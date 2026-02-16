import { RefreshToken } from "@/domain/entities/refresh-token";
import { RefreshTokenRepository } from "@/domain/repositories/refresh-token-repository";
import { PrismaService } from "../prisma";
import { PrismaRefreshTokenAdapter } from "../adapters/prisma-refresh-token-adapter";

export class PrismaRefreshTokenRepository implements RefreshTokenRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    const refreshToken = await this.prisma.refreshToken.findFirst({
      where: { id },
    });

    if (!refreshToken) {
      return null;
    }

    return PrismaRefreshTokenAdapter.toDomain(refreshToken);
  }

  async findByUserId(userId: string) {
    const refreshToken = await this.prisma.refreshToken.findFirst({
      where: { userId },
    });

    if (!refreshToken) {
      return null;
    }

    return PrismaRefreshTokenAdapter.toDomain(refreshToken);
  }

  async delete(id: string) {
    await this.prisma.refreshToken.delete({
      where: {
        id,
      },
    });
  }

  async create(data: RefreshToken) {
    const refreshToken = PrismaRefreshTokenAdapter.toPrisma(data);

    await this.prisma.refreshToken.create({ data: refreshToken });
  }
}
