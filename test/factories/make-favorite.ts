import { Favorite, FavoriteProps } from "@/domain/entities/favorite";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";

export function makeFavorite(data: FavoriteProps, id?: UniqueEntityId) {
  const favorite = Favorite.create(
    {
      userId: data.userId,
      snackId: data.snackId,
    },
    id,
  );

  return favorite;
}
