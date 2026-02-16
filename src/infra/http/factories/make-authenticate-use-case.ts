import { AuthenticateUserUseCase } from "@/domain/use-case/users/authenticate";
import { PrismaService } from "@/infra/database/prisma";
import { PrismaUsersRepository } from "@/infra/database/repositories/prisma-users-repository";

export function makeAuthenticateUseCase(prisma: PrismaService) {
  const usersRepository = new PrismaUsersRepository(prisma);
  const authenticateUseCase = new AuthenticateUserUseCase(usersRepository);

  return authenticateUseCase;
}
