import { UpdateUserUseCase } from "@/domain/use-case/users/update-user";
import { PrismaUsersRepository } from "@/infra/database/repositories/prisma-users-repository";

export function makeUpdateUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const updateUserUseCase = new UpdateUserUseCase(usersRepository);

  return updateUserUseCase;
}
