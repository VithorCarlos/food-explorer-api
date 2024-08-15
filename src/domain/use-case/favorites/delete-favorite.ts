import { FavoriteDoesNotExists } from "@/domain/errors/favorite-does-not-exists";
import { FavoritesRepository } from "@/domain/repositories/favorites-repository";

interface DeleteFavoriteRequest {
  id: string;
}

export class DeleteFavoriteUseCase {
  constructor(private favoritesRepository: FavoritesRepository) {}

  async execute({ id }: DeleteFavoriteRequest) {
    const favorite = await this.favoritesRepository.findById(id);

    if (!favorite) {
      throw new FavoriteDoesNotExists();
    }

    await this.favoritesRepository.delete(id);

    return { favorite };
  }
}
