import { UserDoesNotExists } from "@/domain/errors/user-does-not-exists";
import { UsersRepository } from "@/domain/repositories/users-repository";

interface FindUserByIdRequest {
  userId: string;
}

export class FindUserByIdUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: FindUserByIdRequest) {
    const userExists = await this.usersRepository.findById(userId);

    if (!userExists) {
      throw new UserDoesNotExists();
    }

    const user = await this.usersRepository.findById(userExists.id.toString());

    return { user };
  }
}
