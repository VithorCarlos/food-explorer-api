import { SnacksRepository } from "@/domain/repositories/snacks-repository";

interface SearchSnackRequest {
  page?: number;
  perPage?: number;
  title?: string;
  ingredients?: string[];
}

export class SearchSnackUseCase {
  constructor(private snacksRepository: SnacksRepository) {}

  async execute({
    title,
    ingredients,
    page = 1,
    perPage = 10,
  }: SearchSnackRequest) {
    const snacks = await this.snacksRepository.searchMany({
      page,
      perPage,
      title,
      ingredients,
    });

    return { snacks };
  }
}
