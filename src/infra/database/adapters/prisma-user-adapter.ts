import { User } from "@/domain/entities/user";
import { users as RowUsers } from "generated/prisma/client";

export class PrismaUserAdapter {
  static toPrisma({ id, name, email, password, updated_at, role }: User) {
    return {
      id,
      name,
      email,
      password,
      updated_at,
      role,
    };
  }

  static toDomain({ id, name, email, password, updated_at, role }: RowUsers) {
    return User.create({
      id,
      name,
      email,
      password,
      updated_at,
      role,
    });
  }
}
