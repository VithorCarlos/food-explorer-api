import { randomUUID } from "node:crypto";
import { Snack } from "./snack";

describe("Snack entity", () => {
  it("Shold be able to create user entity", () => {
    const snack = Snack.create({
      id: randomUUID(),
      title: "My title",
      description: "My description",
      category: "my-category",
      price: 89.3,
      imageUrl: "my-image-url.com",
      ingredients: ["igrendient-1", "igredient-2"],
      userId: "user-1",
    });

    expect(snack).toBeDefined();
  });
});
