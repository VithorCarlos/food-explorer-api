import { FindOneProductUseCase } from "@/domain/use-case/products/find-one-product";
import { PrismaService } from "@/infra/database/prisma";
import { PrismaProductsRepository } from "@/infra/database/repositories/prisma-products-repository";
import { R2Storage } from "@/infra/storage/r2-storage";

export function makeFindOneProductUseCase(prisma: PrismaService) {
  const r2Storage = new R2Storage();
  const productsRepository = new PrismaProductsRepository(prisma, r2Storage);
  const findoneProductUseCase = new FindOneProductUseCase(productsRepository);

  return findoneProductUseCase;
}
