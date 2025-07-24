import { FOOD_CATEGORIES } from "@/domain/enums/food-categories";
import { SnacksRepository } from "@/domain/repositories/snacks-repository";

interface SearchSnackRequest {
  page?: number;
  perPage?: number;
  title?: string;
  category?: string;
  ingredients?: string[];
}

export class SearchSnackUseCase {
  constructor(private snacksRepository: SnacksRepository) {}

  async execute({
    title,
    ingredients,
    category,
    page = 1,
    perPage = 10,
  }: SearchSnackRequest) {
    const snacks = await this.snacksRepository.searchMany({
      page,
      perPage,
      category,
      title,
      ingredients,
    });

    return { snacks };
  }
}
