import { FavoriteDoesNotExists } from "@/domain/errors/favorite-does-not-exists";
import { FavoriteNotFoundForThisUser } from "@/domain/errors/favorite-not-found-for-this-user";
import { FavoritesRepository } from "@/domain/repositories/favorites-repository";

interface DeleteFavoriteRequest {
  productId: string;
  userId: string;
}

export class DeleteFavoriteUseCase {
  constructor(private favoritesRepository: FavoritesRepository) {}

  async execute({ productId, userId }: DeleteFavoriteRequest) {
    const favorite = await this.favoritesRepository.findByProductId(productId);

    if (!favorite) {
      throw new FavoriteDoesNotExists();
    }

    if (userId !== favorite.userId.toString()) {
      throw new FavoriteNotFoundForThisUser();
    }

    await this.favoritesRepository.delete(productId, userId);

    return { favorite };
  }
}
