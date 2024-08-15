import { EmailAlreadyExists } from "@/domain/errors/email-already-exists";
import { UserDoesNotExists } from "@/domain/errors/user-does-not-exists";
import { UsersRepository } from "@/domain/repositories/users-repository";
import { hash } from "bcryptjs";

interface UpdateUserRequest {
  userId: string;
  name?: string;
  email?: string;
  password?: string;
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId, name, email, password }: UpdateUserRequest) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UserDoesNotExists();
    }

    let password_hash;

    if (password) {
      password_hash = await hash(password, 6);
    }

    if (email && user.email === email) {
      const userWithEmail = await this.usersRepository.findByEmail(email);

      if (userWithEmail) {
        throw new EmailAlreadyExists();
      }
    }

    user.update({
      ...(name && { name }),
      ...(email && { email }),
      ...(password && { password: password_hash }),
    });

    await this.usersRepository.update(user);

    return { user };
  }
}
