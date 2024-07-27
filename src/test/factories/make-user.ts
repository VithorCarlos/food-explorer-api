import { User, UserProps } from "@/domain/entities/user";
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
