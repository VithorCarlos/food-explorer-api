import { Favorite } from "@/domain/entities/favorite";
import { favorites as RowFavorites } from "@prisma/client";

export interface CustomBindProps {
  favoriteId: string;
  snackId: string;
  userId: string;
  title: string;
  category: string;
  ingredients: string[];
  price: number;
  description: string;
  imageUrl: string;
  updated_at: Date;
}

export class PrismaFavoriteAdapter {
  static toPrisma({ id, snackId, userId }: Favorite) {
    return {
      id,
      snackId,
      userId,
    };
  }

  static toDomain({ id, userId, snackId }: RowFavorites) {
    return Favorite.create({
      id,
      snackId,
      userId,
    });
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
    imageUrl,
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
      imageUrl,
      updated_at,
    };
  }
}
