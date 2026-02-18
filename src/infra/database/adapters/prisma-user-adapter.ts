import { User } from "@/domain/entities/user";
import { Prisma, User as PrismaUser } from "generated/prisma/client";

export class PrismaUserAdapter {
  static toPrisma(user: PrismaUser): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt!,
      role: user.role,
    };
  }

  static toDomain({
    id,
    name,
    email,
    password,
    createdAt,
    updatedAt,
    role,
  }: User) {
    return User.create(
      {
        name,
        email,
        password,
        createdAt,
        updatedAt: updatedAt ?? null,
        role,
      },
      id,
    );
  }
}
