import { Snack } from "@/domain/entities/snack";
import { FOOD_CATEGORIES } from "@/domain/enums/food-categories";
import { SnacksRepository } from "@/domain/repositories/snacks-repository";

interface CreateSnackRequest {
  title: string;
  description: string;
  imageUrl: string;
  category: FOOD_CATEGORIES;
  ingredients: string[];
  price: number;
  userId: string;
}

export class CreateSnackUseCase {
  constructor(private snacksRepository: SnacksRepository) {}

  async execute({
    title,
    description,
    imageUrl,
    category,
    ingredients,
    price,
    userId,
  }: CreateSnackRequest) {
    const snack = Snack.create({
      title,
      description,
      imageUrl,
      category,
      ingredients,
      price,
      userId,
    });

    await this.snacksRepository.create(snack);

    return { snack };
  }
}
