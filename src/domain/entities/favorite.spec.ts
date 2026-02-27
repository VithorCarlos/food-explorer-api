import { Favorite } from "./favorite";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";

describe("Product entity", () => {
  it("Should be able to create user entity", () => {
    const favorite = Favorite.create(
      {
        userId: new UniqueEntityId("user-1"),
        productId: new UniqueEntityId("product-1"),
      },
      new UniqueEntityId(),
    );

    expect(favorite).toBeDefined();
  });
});
