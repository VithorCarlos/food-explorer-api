import { FindUserByIdUseCase } from "@/domain/use-case/users/find-user-by-id";
import { PrismaService } from "@/infra/database/prisma";
import { PrismaUsersRepository } from "@/infra/database/repositories/prisma-users-repository";

export function makeFindUserByIdUseCase(prisma: PrismaService) {
  const usersRepository = new PrismaUsersRepository(prisma);
  const findUserByIdUseCase = new FindUserByIdUseCase(usersRepository);

  return findUserByIdUseCase;
}
