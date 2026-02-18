import { User, UserProps } from "@/domain/entities/user";
import { PrismaUserAdapter } from "@/infra/database/adapters/prisma-user-adapter";
import { PrismaService } from "@/infra/database/prisma";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { faker } from "@faker-js/faker";

export function makeUser(
  data: Partial<UserProps & { id?: UniqueEntityId }> = {},
) {
  const { id, ...rest } = data;
  const user = User.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email({ firstName: "johndoe" }),
      password: faker.internet.password(),
      ...rest,
    },
    id,
  );

  return user;
}

export class UserFactory {
  constructor(private prisma: PrismaService) {}

  async makeUserToPrisma(data: Partial<UserProps> = {}): Promise<User> {
    const user = makeUser(data);

    await this.prisma.user.create({ data: PrismaUserAdapter.toPrisma(user) });

    return user;
  }
}
