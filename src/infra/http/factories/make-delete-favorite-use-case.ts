import { DeleteFavoriteUseCase } from "@/domain/use-case/favorites/delete-favorite";
import { PrismaFavoritesRepository } from "@/infra/database/repositories/prisma-favorites-repository";

export function makeDeleteFavoriteUseCase() {
  const favoriteRepository = new PrismaFavoritesRepository();
  const deleteFavoriteUsecase = new DeleteFavoriteUseCase(favoriteRepository);

  return deleteFavoriteUsecase;
}
