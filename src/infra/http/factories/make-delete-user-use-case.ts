import { DeleteUserUseCase } from "@/domain/use-case/users/delete-user";
import { PrismaService } from "@/infra/database/prisma";
import { PrismaUsersRepository } from "@/infra/database/repositories/prisma-users-repository";

export function makeDeleteUserUseCase(prisma: PrismaService) {
  const usersRepository = new PrismaUsersRepository(prisma);
  const deleteUserUseCase = new DeleteUserUseCase(usersRepository);

  return deleteUserUseCase;
}
