import { randomUUID } from "node:crypto";
import { Snack } from "./snack";
import { FOOD_CATEGORIES } from "../enums/food-categories";

describe("Snack entity", () => {
  it("Should be able to create user entity", () => {
    const snack = Snack.create({
      id: randomUUID(),
      title: "My title",
      description: "My description",
      category: "my-category" as FOOD_CATEGORIES,
      price: 89.3,
      ingredients: ["igrendient-1", "igredient-2"],
      userId: "user-1",
    });

    expect(snack).toBeDefined();
  });
});
