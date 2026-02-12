import { RefreshToken } from "@/domain/entities/refresh-token";
import { refresh_tokens as RowRefreshTokens } from "generated/prisma/client";

export class PrismaRefreshTokenAdapter {
  static toPrisma({ id, expiresIn, userId }: RefreshToken) {
    return {
      id,
      expiresIn,
      userId,
    };
  }

  static toDomain({ id, userId, expiresIn }: RowRefreshTokens) {
    return RefreshToken.create({
      id,
      userId,
      expiresIn,
    });
  }
}
