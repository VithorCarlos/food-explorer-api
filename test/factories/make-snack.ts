import { Snack, SnackProps } from "@/domain/entities/snack";
import { FOOD_CATEGORIES } from "@/domain/enums/food-categories";
import { faker } from "@faker-js/faker";
import { randomUUID } from "node:crypto";

export function makeSnack(override: Partial<SnackProps> = {}, userId?: string) {
  const snack = Snack.create({
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price()),
    category: faker.commerce.department() as FOOD_CATEGORIES,
    ingredients: faker.helpers.multiple(faker.commerce.product, { count: 3 }),
    userId: userId ?? randomUUID(),
    ...override,
  });

  return snack;
}
