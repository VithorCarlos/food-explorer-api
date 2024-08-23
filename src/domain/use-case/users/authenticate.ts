import { UserDoesNotExists } from "@/domain/errors/user-does-not-exists";
import { UserInvalidCredential } from "@/domain/errors/user-invalid-crendential";
import { UsersRepository } from "@/domain/repositories/users-repository";
import { GenerateToken } from "@/domain/services/generate-token";
import { compare } from "bcryptjs";

interface AuthenticateUserRequest {
  email: string;
  password: string;
}

export class AuthenticateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, password }: AuthenticateUserRequest) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UserDoesNotExists();
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new UserInvalidCredential();
    }

    const accessToken = GenerateToken.generate({
      userId: user.id,
    });

    return { accessToken };
  }
}
