import { DeleteFavoriteUseCase } from "@/domain/use-case/favorites/delete-favorite";
import { PrismaService } from "@/infra/database/prisma";
import { PrismaFavoritesRepository } from "@/infra/database/repositories/prisma-favorites-repository";

export function makeDeleteFavoriteUseCase(prisma: PrismaService) {
  const favoriteRepository = new PrismaFavoritesRepository(prisma);
  const deleteFavoriteUsecase = new DeleteFavoriteUseCase(favoriteRepository);

  return deleteFavoriteUsecase;
}
