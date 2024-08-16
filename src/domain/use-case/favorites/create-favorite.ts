import { Favorite } from "@/domain/entities/favorite";
import { FavoritesRepository } from "@/domain/repositories/favorites-repository";
import { PrismaFavoriteAdapter } from "@/infra/database/adapters/prisma-favorite-adapter";

interface CreateFavoriteRequest {
  userId: string;
  snackId: string;
}

export class CreateFavoriteUseCase {
  constructor(private favoritesRepository: FavoritesRepository) {}

  async execute({ userId, snackId }: CreateFavoriteRequest) {
    const favorited = await this.favoritesRepository.findBySnackId(snackId);

    if (favorited?.snackId !== snackId) {
      const favorite = Favorite.create({
        userId,
        snackId,
      });

      await this.favoritesRepository.create(favorite);

      return { favorite };
    }
  }
}
