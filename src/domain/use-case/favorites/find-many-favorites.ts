import { FavoritesRepository } from "@/domain/repositories/favorites-repository";

interface FindManyFavoriteRequest {
  userId: string;
  page?: number;
  perPage?: number;
}

export class FindManyFavoriteUseCase {
  constructor(private favoritesRepository: FavoritesRepository) {}

  async execute({ userId, page = 1, perPage = 10 }: FindManyFavoriteRequest) {
    const favorites = await this.favoritesRepository.findMany(
      { page, perPage },
      userId,
    );

    return { favorites };
  }
}
