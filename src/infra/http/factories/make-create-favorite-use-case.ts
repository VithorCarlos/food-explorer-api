import { CreateFavoriteUseCase } from "@/domain/use-case/favorites/create-favorite";
import { PrismaService } from "@/infra/database/prisma";
import { PrismaFavoritesRepository } from "@/infra/database/repositories/prisma-favorites-repository";
import { PrismaSnacksRepository } from "@/infra/database/repositories/prisma-snacks-repository";

export function makeCreateFavoriteUseCase(prisma: PrismaService) {
  const favoriteRepository = new PrismaFavoritesRepository(prisma);
  const snacksRepository = new PrismaSnacksRepository(prisma);
  const createFavoriteUsecase = new CreateFavoriteUseCase(
    favoriteRepository,
    snacksRepository,
  );

  return createFavoriteUsecase;
}
