import { User, UserProps } from "@/domain/entities/user";
import { PrismaUserAdapter } from "@/infra/database/adapters/prisma-user-adapter";
import { PrismaService } from "@/infra/database/prisma";
import { faker } from "@faker-js/faker";

export function makeUser(override: Partial<UserProps> = {}) {
  const user = User.create({
    name: faker.person.firstName(),
    email: faker.internet.email({ firstName: "johndoe" }),
    password: faker.internet.password(),
    ...override,
  });

  return user;
}

export class UserFactory {
  constructor(private prisma: PrismaService) {}

  async makeUserToPrisma(data: Partial<UserProps> = {}): Promise<User> {
    const user = makeUser(data);

    await this.prisma.user.create({
      data: PrismaUserAdapter.toPrisma(user),
    });

    return user;
  }
}
