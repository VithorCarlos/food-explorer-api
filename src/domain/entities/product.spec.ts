import { Product } from "./product";
import { PRODUCT_CATEGORIES } from "../enums/product-categories";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";

describe("Product entity", () => {
  it("Should be able to create user entity", () => {
    const product = Product.create(
      {
        title: "My title",
        description: "My description",
        category: "my-category" as PRODUCT_CATEGORIES,
        price: 89.3,
        ingredients: ["igrendient-1", "igredient-2"],
        userId: new UniqueEntityId("user-1"),
      },
      new UniqueEntityId(),
    );

    expect(product).toBeDefined();
  });
});
