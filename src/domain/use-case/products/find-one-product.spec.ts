import { makeProduct } from "test/factories/make-product";
import { FindOneProductUseCase } from "./find-one-product";
import { InMemoryAttachmentLinkRepository } from "test/repositories/in-memory-attachment-link-repository";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { InMemoryProductsRepository } from "test/repositories/in-memory-products-repository";
import { ProductDoesNotExists } from "@/domain/errors/product-does-not-exists";

let sut: FindOneProductUseCase;
let inMemoryProductsRepository: InMemoryProductsRepository;
let inMemoryAttachmentLinkRepository: InMemoryAttachmentLinkRepository;

describe("Find one product", () => {
  beforeEach(() => {
    inMemoryAttachmentLinkRepository = new InMemoryAttachmentLinkRepository();
    inMemoryProductsRepository = new InMemoryProductsRepository(
      inMemoryAttachmentLinkRepository,
    );
    sut = new FindOneProductUseCase(inMemoryProductsRepository);
  });

  it("Should be able to find one  product", async () => {
    await inMemoryProductsRepository.create(
      makeProduct(
        {
          id: new UniqueEntityId("product-01"),
          attachmentId: new UniqueEntityId("attachment-01"),
        },
        new UniqueEntityId("user-01"),
      ),
    );

    await inMemoryProductsRepository.create(
      makeProduct(
        {
          id: new UniqueEntityId("product-02"),
          attachmentId: new UniqueEntityId("attachment-01"),
        },
        new UniqueEntityId("user-01"),
      ),
    );

    const { product } = await sut.execute({
      id: "product-01",
    });

    expect(inMemoryProductsRepository.items).toHaveLength(2);
    expect(inMemoryProductsRepository.items[0].id.toString()).toEqual(
      "product-01",
    );
    expect(product.productId.toString()).toEqual("product-01");
  });

  it("It should not be possible to find one a non-existent product", async () => {
    await expect(
      sut.execute({
        id: "product-01",
      }),
    ).rejects.toThrowError(ProductDoesNotExists);
  });
});
