import { FindManyFavoriteUseCase } from "@/domain/use-case/favorites/find-many-favorites";
import { PrismaFavoritesRepository } from "@/infra/database/repositories/prisma-favorites-repository";

export function makeFindManyFavoriteUseCase() {
  const favoriteRepository = new PrismaFavoritesRepository();
  const findManyFavoriteUsecase = new FindManyFavoriteUseCase(
    favoriteRepository
  );

  return findManyFavoriteUsecase;
}
