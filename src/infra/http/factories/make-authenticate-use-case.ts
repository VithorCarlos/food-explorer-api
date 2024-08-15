import { AuthenticateUserUseCase } from "@/domain/use-case/users/authenticate";
import { PrismaUsersRepository } from "@/infra/database/repositories/prisma-users-repository";

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUserUseCase(usersRepository);

  return authenticateUseCase;
}
