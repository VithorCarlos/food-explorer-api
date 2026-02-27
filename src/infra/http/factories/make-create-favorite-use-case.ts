import { CreateFavoriteUseCase } from "@/domain/use-case/favorites/create-favorite";
import { PrismaService } from "@/infra/database/prisma";
import { PrismaFavoritesRepository } from "@/infra/database/repositories/prisma-favorites-repository";
import { PrismaProductsRepository } from "@/infra/database/repositories/prisma-products-repository";
import { R2Storage } from "@/infra/storage/r2-storage";

export function makeCreateFavoriteUseCase(prisma: PrismaService) {
  const favoriteRepository = new PrismaFavoritesRepository(prisma);
  const r2Upload = new R2Storage();
  const productRepository = new PrismaProductsRepository(prisma, r2Upload);
  const createFavoriteUsecase = new CreateFavoriteUseCase(
    favoriteRepository,
    productRepository,
  );

  return createFavoriteUsecase;
}
