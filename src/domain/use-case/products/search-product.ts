import { ProductsRepository } from "@/domain/repositories/products-repository";
import { PRODUCT_CATEGORIES } from "generated/prisma/enums";

interface SearchProductRequest {
  page?: number;
  perPage?: number;
  title?: string;
  category?: PRODUCT_CATEGORIES;
  ingredients?: string[];
}

export class SearchProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    title,
    ingredients,
    category,
    page = 1,
    perPage = 10,
  }: SearchProductRequest) {
    const products = await this.productsRepository.searchManyWithAttachments({
      page,
      perPage,
      ...(title && { title }),
      ...(category && { category }),
      ...(ingredients?.length && { ingredients }),
    });

    return { products };
  }
}
