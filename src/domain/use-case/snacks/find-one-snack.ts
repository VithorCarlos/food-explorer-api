import { SnackDoesNotExists } from "@/domain/errors/snack-does-not-exists";
import { SnacksRepository } from "@/domain/repositories/snacks-repository";

interface FindOneSnackRequest {
  id: string;
}

export class FindOneSnackUseCase {
  constructor(private snacksRepository: SnacksRepository) {}

  async execute({ id }: FindOneSnackRequest) {
    const snack = await this.snacksRepository.findByIdWithAttachment(id);

    if (!snack) {
      throw new SnackDoesNotExists();
    }

    return { snack };
  }
}
