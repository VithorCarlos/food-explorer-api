import { SnacksRepository } from "@/domain/repositories/snacks-repository";

export class FindActiveCategoriesUseCase {
  constructor(private snacksRepository: SnacksRepository) {}

  async execute() {
    const categories = await this.snacksRepository.findActiveCategories();

    return { categories };
  }
}
