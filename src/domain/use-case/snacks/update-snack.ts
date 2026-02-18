import { FOOD_CATEGORIES } from "@/domain/enums/food-categories";
import { SnackDoesNotExists } from "@/domain/errors/snack-does-not-exists";
import { SnackNotFoundForThisUser } from "@/domain/errors/snack-not-found-for-this-user";
import { SnacksRepository } from "@/domain/repositories/snacks-repository";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";

interface UdpateSnackRequest {
  snackId: string;
  attachmentId?: string;
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
    snackId,
    attachmentId,
    title,
    description,
    category,
    ingredients,
    price,
    userId,
  }: UdpateSnackRequest) {
    const snack = await this.snacksRepository.findById(snackId);

    if (!snack) {
      throw new SnackDoesNotExists();
    }

    if (userId !== snack.userId.toString()) {
      throw new SnackNotFoundForThisUser();
    }

    if (title) snack.title = title;
    if (description) snack.description = description;
    if (category) snack.category = category;
    if (ingredients) snack.ingredients = ingredients;
    if (price !== undefined) snack.price = price;
    if (attachmentId !== undefined)
      snack.changeAttachment(new UniqueEntityId(attachmentId));

    await this.snacksRepository.update(snack);

    return { snack };
  }
}
