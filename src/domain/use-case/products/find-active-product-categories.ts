import { ProductsRepository } from "@/domain/repositories/products-repository";

export class FindActiveCategoriesUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute() {
    const categories = await this.productsRepository.findActiveCategories();

    return { categories };
  }
}
