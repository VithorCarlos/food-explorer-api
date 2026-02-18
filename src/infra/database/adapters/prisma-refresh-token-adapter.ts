import { RefreshToken } from "@/domain/entities/refresh-token";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import {
  Prisma,
  RefreshToken as RowRefreshTokens,
} from "generated/prisma/client";

export class PrismaRefreshTokenAdapter {
  static toPrisma({
    id,
    expiresIn,
    userId,
  }: RefreshToken): Prisma.RefreshTokenUncheckedCreateInput {
    return {
      id: id.toString(),
      expiresIn,
      userId: userId.toString(),
    };
  }

  static toDomain({ id, userId, expiresIn }: RowRefreshTokens) {
    return RefreshToken.create(
      {
        userId,
        expiresIn,
      },
      new UniqueEntityId(id),
    );
  }
}
