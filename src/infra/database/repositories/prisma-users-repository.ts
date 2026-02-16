import { UsersRepository } from "@/domain/repositories/users-repository";
import { User } from "@/domain/entities/user";
import { PrismaUserAdapter } from "../adapters/prisma-user-adapter";
import { PrismaService } from "../prisma";

export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.user.findFirst({
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
    const user = await this.prisma.user.findFirst({
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

    await this.prisma.user.create({ data: user });
  }

  async update(data: User) {
    const user = PrismaUserAdapter.toPrisma(data);

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: user.name,
        password: user.password,
        email: user.email,
        updatedAt: user.updated_at,
      },
    });
  }

  async delete(id: string) {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
