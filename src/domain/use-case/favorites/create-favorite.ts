import { Favorite } from "@/domain/entities/favorite";
import { FavoritesRepository } from "@/domain/repositories/favorites-repository";

interface CreateFavoriteRequest {
  userId: string;
  snackId: string;
}

export class CreateFavoriteUseCase {
  constructor(private favoritesRepository: FavoritesRepository) {}

  async execute({ userId, snackId }: CreateFavoriteRequest) {
    const favorite = Favorite.create({
      userId,
      snackId,
    });

    await this.favoritesRepository.create(favorite);

    return { favorite };
  }
}
