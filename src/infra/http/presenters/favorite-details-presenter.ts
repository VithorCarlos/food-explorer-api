import { FavoriteDetails } from "@/domain/entities/value-objects/favorite-details";

export class FavoriteDetailsPresenter {
  static toHTTP(FavoriteDetails: FavoriteDetails) {
    return {
      favoriteId: FavoriteDetails.favoriteId.toString(),
      snackId: FavoriteDetails.snackId.toString(),
      userId: FavoriteDetails.userId.toString(),
      attachmentUrl: FavoriteDetails.attachmentUrl,
      title: FavoriteDetails.title,
      category: FavoriteDetails.category,
      ingredients: FavoriteDetails.ingredients,
      price: FavoriteDetails.price,
      description: FavoriteDetails.description,
    };
  }
}
