import { FavoriteDetails } from "@/domain/entities/value-objects/favorite-details";

export class FavoriteDetailsPresenter {
  static toHTTP(FavoriteDetails: FavoriteDetails) {
    return {
      favoriteId: FavoriteDetails.favoriteId.toString(),
      productId: FavoriteDetails.productId.toString(),
      userId: FavoriteDetails.userId.toString(),
      attachmentUrl: FavoriteDetails.attachmentUrl,
      title: FavoriteDetails.title,
      category: FavoriteDetails.category,
      price: FavoriteDetails.price,
    };
  }
}
