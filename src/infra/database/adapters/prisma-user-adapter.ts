import { User } from "@/domain/entities/user";
import { User as RowUsers } from "generated/prisma/client";

export class PrismaUserAdapter {
  static toPrisma({
    id,
    name,
    email,
    password,
    updatedAt,
    createdAt,
    role,
  }: RowUsers) {
    return {
      id,
      name,
      email,
      password,
      createdAt,
      updatedAt: updatedAt ?? null,
      role,
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
    return User.create({
      id,
      name,
      email,
      password,
      createdAt,
      updatedAt: updatedAt ?? null,
      role,
    });
  }
}
