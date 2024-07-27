import { User } from "../entities/user";
import { UserAlreadyExists } from "../errors/user-already-exists";
import { UsersRepository } from "../repositories/users-repository";
import { hash } from "bcryptjs";

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: CreateUserRequest) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new UserAlreadyExists();
    }

    const password_hash = await hash(password, 6);

    const user = User.create({
      name,
      email,
      password: password_hash,
    });

    await this.usersRepository.create(user);

    return { user };
  }
}
