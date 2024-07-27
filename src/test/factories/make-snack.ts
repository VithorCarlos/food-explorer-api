import { Snack, SnackProps } from "@/domain/entities/snack";
import { faker } from "@faker-js/faker";

export function makeSnack(override: Partial<SnackProps> = {}, userId: string) {
  const user = Snack.create({
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price()),
    category: faker.commerce.department(),
    ingredients: faker.helpers.multiple(faker.commerce.product, { count: 3 }),
    imageUrl: faker.internet.url(),
    userId,
    ...override,
  });

  return user;
}
