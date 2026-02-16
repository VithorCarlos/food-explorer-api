import { UpdateUserUseCase } from "@/domain/use-case/users/update-user";
import { PrismaService } from "@/infra/database/prisma";
import { PrismaUsersRepository } from "@/infra/database/repositories/prisma-users-repository";

export function makeUpdateUserUseCase(prisma: PrismaService) {
  const usersRepository = new PrismaUsersRepository(prisma);
  const updateUserUseCase = new UpdateUserUseCase(usersRepository);

  return updateUserUseCase;
}
