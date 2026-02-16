import { CreateUserUseCase } from "@/domain/use-case/users/create-user";
import { PrismaService } from "@/infra/database/prisma";
import { PrismaUsersRepository } from "@/infra/database/repositories/prisma-users-repository";

export function makeRegisterUserUseCase(prisma: PrismaService) {
  const usersRepository = new PrismaUsersRepository(prisma);
  const registerUserUseCase = new CreateUserUseCase(usersRepository);

  return registerUserUseCase;
}
