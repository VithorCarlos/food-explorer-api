import { UsersRepository } from "@/domain/repositories/users-repository";
import { prisma } from "../prisma";
import { User } from "@/domain/entities/user";
import { PrismaUserAdapter } from "../adapters/prisma-user-adapter";

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string) {
    const user = await prisma.users.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserAdapter.toDomain(user);
  }

  async findByEmail(email: string) {
    const user = await prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserAdapter.toDomain(user);
  }

  async create(data: User) {
    const user = PrismaUserAdapter.toPrisma(data);

    await prisma.users.create({ data: user });
  }

  async update(data: User) {
    const user = PrismaUserAdapter.toPrisma(data);

    await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        name: user.name,
        password: user.password,
        email: user.email,
      },
    });
  }

  async delete(id: string) {
    await prisma.users.delete({
      where: {
        id,
      },
    });
  }
}
