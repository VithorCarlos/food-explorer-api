import { SnackDoesNotExists } from "@/domain/errors/snack-does-not-exists";
import { SnackNotFoundForThisUser } from "@/domain/errors/snack-not-found-for-this-user";
import { SnacksRepository } from "@/domain/repositories/snacks-repository";

interface DeleteSnackRequest {
  id: string;
  userId: string;
}

export class DeleteSnackUseCase {
  constructor(private snacksRepository: SnacksRepository) {}

  async execute({ id, userId }: DeleteSnackRequest) {
    const snack = await this.snacksRepository.findById(id);

    if (!snack) {
      throw new SnackDoesNotExists();
    }

    if (userId !== snack.userId) {
      throw new SnackNotFoundForThisUser();
    }

    await this.snacksRepository.delete(snack.id);
  }
}
