import { CreateFavoriteUseCase } from "@/domain/use-case/favorites/create-favorite";
import { PrismaService } from "@/infra/database/prisma";
import { PrismaFavoritesRepository } from "@/infra/database/repositories/prisma-favorites-repository";

export function makeCreateFavoriteUseCase(prisma: PrismaService) {
  const favoriteRepository = new PrismaFavoritesRepository(prisma);
  const createFavoriteUsecase = new CreateFavoriteUseCase(favoriteRepository);

  return createFavoriteUsecase;
}
