import { UserDoesNotExists } from "@/domain/errors/user-does-not-exists";
import { UsersRepository } from "@/domain/repositories/users-repository";

interface DeleteUserRequest {
  userId: string;
}

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: DeleteUserRequest) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UserDoesNotExists();
    }

    await this.usersRepository.delete(user.id.toString());
  }
}
