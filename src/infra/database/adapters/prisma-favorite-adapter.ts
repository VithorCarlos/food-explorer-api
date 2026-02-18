import { Favorite } from "@/domain/entities/favorite";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { Prisma } from "generated/prisma/browser";
import { Favorite as RowFavorites } from "generated/prisma/client";

export interface CustomBindProps {
  favoriteId: string;
  snackId: string;
  userId: string;
  title: string;
  category: string;
  ingredients: string[];
  price: number;
  description: string;
}

export class PrismaFavoriteAdapter {
  static toPrisma({
    id,
    snackId,
    userId,
  }: Favorite): Prisma.FavoriteUncheckedCreateInput {
    return {
      id: id.toString(),
      snackId: snackId.toString(),
      userId: userId.toString(),
    };
  }

  static toDomain({ id, userId, snackId }: RowFavorites) {
    return Favorite.create(
      {
        snackId: new UniqueEntityId(snackId),
        userId: new UniqueEntityId(userId),
      },
      new UniqueEntityId(id),
    );
  }
}
