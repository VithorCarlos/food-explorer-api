import { Favorite, FavoriteProps } from "@/domain/entities/favorite";

export function makeFavorite({ id, userId, snackId }: FavoriteProps) {
  const favorite = Favorite.create({
    id,
    userId,
    snackId,
  });

  return favorite;
}
