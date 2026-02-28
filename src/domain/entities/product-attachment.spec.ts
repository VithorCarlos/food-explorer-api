import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { ProductAttachment } from "./product-attachment";

describe("Product attachment entity", () => {
  it("Should be able to create product attachment entity", () => {
    const productAttachment = ProductAttachment.create(
      {
        isMain: true,
        position: 0,
        attachmentId: new UniqueEntityId("user-1"),
        productId: new UniqueEntityId("product-1"),
      },
      new UniqueEntityId(),
    );

    expect(productAttachment).toBeDefined();
  });
});
