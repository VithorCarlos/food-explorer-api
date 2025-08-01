import { Snack } from "@/domain/entities/snack";
import { FOOD_CATEGORIES } from "@/domain/enums/food-categories";
import { AttachmentRepository } from "@/domain/repositories/attachment-repository";
import { SnacksRepository } from "@/domain/repositories/snacks-repository";

interface CreateSnackRequest {
  title: string;
  description: string;
  category: FOOD_CATEGORIES;
  ingredients: string[];
  price: number;
  userId: string;
}

export class CreateSnackUseCase {
  constructor(
    private snacksRepository: SnacksRepository,
    private attachmentRepository: AttachmentRepository
  ) {}

  async execute({
    title,
    description,
    category,
    ingredients,
    price,
    userId,
  }: CreateSnackRequest) {
    const snack = Snack.create({
      title,
      description,
      category,
      ingredients,
      price,
      userId,
    });

    // await this.attachmentRepository.create({attachment})
    await this.snacksRepository.create(snack);

    return { snack };
  }
}
