import { AttachmentLink } from "@/domain/entities/attachment-link";
import { Snack } from "@/domain/entities/snack";
import { FOOD_CATEGORIES } from "@/domain/enums/food-categories";
import { SnacksRepository } from "@/domain/repositories/snacks-repository";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { $Enums } from "generated/prisma/client";

interface CreateSnackRequest {
  title: string;
  description: string;
  category: FOOD_CATEGORIES;
  ingredients: string[];
  price: number;
  userId: string;
  attachmentId: string;
}

export class CreateSnackUseCase {
  constructor(private snacksRepository: SnacksRepository) {}

  async execute({
    title,
    description,
    category,
    ingredients,
    price,
    userId,
    attachmentId,
  }: CreateSnackRequest) {
    const snack = Snack.create({
      title,
      description,
      category,
      ingredients,
      price,
      userId: new UniqueEntityId(userId),
    });

    if (attachmentId) {
      snack.changeAttachment(new UniqueEntityId(attachmentId));
    }

    await this.snacksRepository.create(snack);

    return { snack };
  }
}
