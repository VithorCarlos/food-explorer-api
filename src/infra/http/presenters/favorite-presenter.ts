import { Favorite } from "@/domain/entities/favorite";

export class FavoritePresenter {
  static toHTTP(favorite: Favorite) {
    return {
      id: favorite.id.toString(),
      snackId: favorite.snackId.toString(),
      userId: favorite.userId.toString(),
    };
  }
}
