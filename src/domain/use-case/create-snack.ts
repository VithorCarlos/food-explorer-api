import { Snack } from "../entities/snack";
import { SnacksRepository } from "../repositories/snacks-repository";

interface CreateSnackRequest {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
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
