import { Favorite } from "@/domain/entities/favorite";
import { SnackNotFoundForThisUser } from "@/domain/errors/snack-not-found-for-this-user";
import { FavoritesRepository } from "@/domain/repositories/favorites-repository";
import { SnacksRepository } from "@/domain/repositories/snacks-repository";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";

interface CreateFavoriteRequest {
  userId: string;
  snackId: string;
}

export class CreateFavoriteUseCase {
  constructor(
    private favoritesRepository: FavoritesRepository,
    private snacksRepository: SnacksRepository,
  ) {}

  async execute({ userId, snackId }: CreateFavoriteRequest): Promise<Favorite> {
    const snack = await this.snacksRepository.findById(snackId);

    if (!snack) {
      throw new SnackNotFoundForThisUser();
    }

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
