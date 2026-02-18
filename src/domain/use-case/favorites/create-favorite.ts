import { Favorite } from "@/domain/entities/favorite";
import { FavoritesRepository } from "@/domain/repositories/favorites-repository";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";

interface CreateFavoriteRequest {
  userId: string;
  snackId: string;
}

export class CreateFavoriteUseCase {
  constructor(private favoritesRepository: FavoritesRepository) {}

  async execute({ userId, snackId }: CreateFavoriteRequest) {
    const alreadyFavorited =
      await this.favoritesRepository.findByUserAndSnackId(userId, snackId);

    if (alreadyFavorited) {
      return alreadyFavorited;
    }

    const favorite = Favorite.create({
      userId: new UniqueEntityId(userId),
      snackId: new UniqueEntityId(snackId),
    });

    await this.favoritesRepository.create(favorite);

    return favorite;
  }
}
