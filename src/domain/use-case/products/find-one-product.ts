import { ProductDoesNotExists } from "@/domain/errors/product-does-not-exists";
import { ProductsRepository } from "@/domain/repositories/products-repository";

interface FindOneProductRequest {
  id: string;
}

export class FindOneProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({ id }: FindOneProductRequest) {
    const product = await this.productsRepository.findByIdWithAttachment(id);

    if (!product) {
      throw new ProductDoesNotExists();
    }

    return { product };
  }
}
