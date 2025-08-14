import { AttachmentLink } from "@/domain/entities/attachment-link";
import { Snack } from "@/domain/entities/snack";
import { FOOD_CATEGORIES } from "@/domain/enums/food-categories";
import { AttachmentRepository } from "@/domain/repositories/attachment-repository";
import { SnacksRepository } from "@/domain/repositories/snacks-repository";
import { $Enums } from "@prisma/client";

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
    attachmentId,
  }: CreateSnackRequest) {
    const snack = Snack.create({
      title,
      description,
      category,
      ingredients,
      price,
      userId,
    });

    if (attachmentId) {
      const attachmentLink = AttachmentLink.create({
        attachmentId,
        resourceId: snack.id,
        resourceType: $Enums.RESOURSE_TYPE.SNACK,
      });

      snack.update({ attachment: attachmentLink });

      await this.attachmentRepository.createLink(attachmentLink);
    }

    await this.snacksRepository.create(snack);

    return { snack };
  }
}
