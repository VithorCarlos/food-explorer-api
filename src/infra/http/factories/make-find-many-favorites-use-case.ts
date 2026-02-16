import { FindManyFavoriteUseCase } from "@/domain/use-case/favorites/find-many-favorites";
import { PrismaService } from "@/infra/database/prisma";
import { PrismaFavoritesRepository } from "@/infra/database/repositories/prisma-favorites-repository";

export function makeFindManyFavoriteUseCase(prisma: PrismaService) {
  const favoriteRepository = new PrismaFavoritesRepository(prisma);
  const findManyFavoriteUsecase = new FindManyFavoriteUseCase(
    favoriteRepository,
  );

  return findManyFavoriteUsecase;
}
