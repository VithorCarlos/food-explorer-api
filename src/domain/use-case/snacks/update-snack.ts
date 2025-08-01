import { FOOD_CATEGORIES } from "@/domain/enums/food-categories";
import { SnackDoesNotExists } from "@/domain/errors/snack-does-not-exists";
import { SnackNotFoundForThisUser } from "@/domain/errors/snack-not-found-for-this-user";
import { SnacksRepository } from "@/domain/repositories/snacks-repository";

interface UdpateSnackRequest {
  id: string;
  userId: string;
  title?: string;
  description?: string;
  category?: FOOD_CATEGORIES;
  ingredients?: string[];
  price?: number;
}

export class UdpateSnackUseCase {
  constructor(private snacksRepository: SnacksRepository) {}

  async execute({
    title,
    description,
    category,
    ingredients,
    price,
    userId,
    id,
  }: UdpateSnackRequest) {
    const snack = await this.snacksRepository.findById(id);

    if (!snack) {
      throw new SnackDoesNotExists();
    }

    if (userId !== snack.userId) {
      throw new SnackNotFoundForThisUser();
    }

    snack.update({
      ...(title && { title }),
      ...(description && { description }),
      ...(category && { category }),
      ...(ingredients && { ingredients }),
      ...(price && { price }),
    });

    await this.snacksRepository.update(snack);

    return { snack };
  }
}
