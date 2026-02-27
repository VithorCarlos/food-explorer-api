import { CreateProductUseCase } from "@/domain/use-case/products/create-product";
import { PrismaService } from "@/infra/database/prisma";
import { PrismaProductsRepository } from "@/infra/database/repositories/prisma-products-repository";
import { R2Storage } from "@/infra/storage/r2-storage";

export function makeCreateProductUseCase(prisma: PrismaService) {
  const r2Storage = new R2Storage();
  const productsRepository = new PrismaProductsRepository(prisma, r2Storage);
  const createProductUsecase = new CreateProductUseCase(productsRepository);

  return createProductUsecase;
}
