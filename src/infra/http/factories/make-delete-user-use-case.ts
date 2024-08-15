import { DeleteUserUseCase } from "@/domain/use-case/users/delete-user";
import { PrismaUsersRepository } from "@/infra/database/repositories/prisma-users-repository";

export function makeDeleteUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const deleteUserUseCase = new DeleteUserUseCase(usersRepository);

  return deleteUserUseCase;
}
