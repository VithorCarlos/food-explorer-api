import { CreateUserUseCase } from "@/domain/use-case/users/create-user";
import { PrismaUsersRepository } from "@/infra/database/repositories/prisma-users-repository";

export function makeRegisterUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const registerUserUseCase = new CreateUserUseCase(usersRepository);

  return registerUserUseCase;
}
