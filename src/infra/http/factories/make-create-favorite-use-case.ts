import { CreateFavoriteUseCase } from "@/domain/use-case/favorites/create-favorite";
import { PrismaFavoritesRepository } from "@/infra/database/repositories/prisma-favorites-repository";

export function makeCreateFavoriteUseCase() {
  const favoriteRepository = new PrismaFavoritesRepository();
  const createFavoriteUsecase = new CreateFavoriteUseCase(favoriteRepository);

  return createFavoriteUsecase;
}
