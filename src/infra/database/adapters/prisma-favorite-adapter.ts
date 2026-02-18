import { Favorite } from "@/domain/entities/favorite";
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
  updated_at: Date;
}

export class PrismaFavoriteAdapter {
  static toPrisma({
    id,
    snackId,
    userId,
  }: RowFavorites): Prisma.FavoriteUncheckedCreateInput {
    return {
      id: id.toString(),
      snackId,
      userId,
    };
  }

  static toDomain({ id, userId, snackId }: Favorite) {
    return Favorite.create(
      {
        snackId,
        userId,
      },
      id,
    );
  }

  static toBind({
    snackId,
    favoriteId,
    title,
    category,
    ingredients,
    userId,
    price,
    description,
    updated_at,
  }: CustomBindProps) {
    return {
      snackId,
      favoriteId,
      title,
      category,
      ingredients,
      userId,
      price,
      description,
      updated_at,
    };
  }
}
