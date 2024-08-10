import { SnackDoesNotExists } from "@/domain/errors/snack-does-not-exists";
import { SnackNotFoundForThisUser } from "@/domain/errors/snack-not-found-for-this-user";
import { SnacksRepository } from "@/domain/repositories/snacks-repository";

interface UdpateSnackRequest {
  title?: string;
  description?: string;
  imageUrl?: string;
  category?: string;
  ingredients?: string[];
  price?: number;
  userId: string;
  id: string;
}

export class UdpateSnackUseCase {
  constructor(private snacksRepository: SnacksRepository) {}

  async execute({
    title,
    description,
    imageUrl,
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
      ...(imageUrl && { imageUrl }),
    });

    await this.snacksRepository.save(snack);

    return { snack };
  }
}
