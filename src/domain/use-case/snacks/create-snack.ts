import { AttachmentLink } from "@/domain/entities/attachment-link";
import { Snack } from "@/domain/entities/snack";
import { FOOD_CATEGORIES } from "@/domain/enums/food-categories";
import { AttachmentLinkRepository } from "@/domain/repositories/attachment-link-repository";
import { AttachmentRepository } from "@/domain/repositories/attachment-repository";
import { SnacksRepository } from "@/domain/repositories/snacks-repository";
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
  constructor(
    private snacksRepository: SnacksRepository,
    private attachmentLinkRepository: AttachmentLinkRepository,
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
    // const attachmentAlreadyLinked =
    //   await this.attachmentLinkRepository.findByResource(snack.id);

    // if (attachmentAlreadyLinked) {
    //   throw new Error("Attachment's already linked to an attachment");
    // }

    if (attachmentId) {
      const attachmentLink = AttachmentLink.create({
        attachmentId,
        resourceId: snack.id,
        resourceType: $Enums.RESOURSE_TYPE.SNACK,
        linkedAt: new Date(),
      });

      snack.update({ attachmentLink });
    }

    await this.snacksRepository.create(snack);

    return { snack };
  }
}
