import { InMemoryProductsRepository } from "test/repositories/in-memory-products-repository";
import { makeProduct } from "test/factories/make-product";
import { DeleteProductUseCase } from "./delete-product";
import { ProductDoesNotExists } from "@/domain/errors/product-does-not-exists";
import { ProductNotFoundForThisUser } from "@/domain/errors/product-not-found-for-this-user";
import { InMemoryAttachmentLinkRepository } from "test/repositories/in-memory-attachment-link-repository";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";

let sut: DeleteProductUseCase;
let inMemoryAttachmentLinkRepository: InMemoryAttachmentLinkRepository;

let inMemoryProductsRepository: InMemoryProductsRepository;

describe("Delete product", () => {
  beforeEach(() => {
    inMemoryAttachmentLinkRepository = new InMemoryAttachmentLinkRepository();
    inMemoryProductsRepository = new InMemoryProductsRepository(
      inMemoryAttachmentLinkRepository,
    );
    sut = new DeleteProductUseCase(inMemoryProductsRepository);
  });

  it("Should be able to delete an product", async () => {
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
          attachmentId: new UniqueEntityId("attachment-02"),
        },
        new UniqueEntityId("user-02"),
      ),
    );

    await sut.execute({
      id: "product-01",
      userId: "user-01",
    });

    expect(inMemoryProductsRepository.items).toHaveLength(1);
    expect(inMemoryAttachmentLinkRepository.items).toHaveLength(1);
    expect(inMemoryAttachmentLinkRepository.items[0].attachmentId).not.toEqual(
      "attachment-01",
    );
    expect(inMemoryProductsRepository.items[0].id.toString()).toEqual(
      "product-02",
    );
  });

  it("It should not be possible to delete a non-existent product", async () => {
    await expect(
      sut.execute({
        id: "product-01",
        userId: "user-02",
      }),
    ).rejects.toThrowError(ProductDoesNotExists);
  });

  it("Should not be possible to delete a product with different user Id created for this one", async () => {
    const product = makeProduct(
      { id: new UniqueEntityId("product-01") },
      new UniqueEntityId("user-01"),
    );

    await inMemoryProductsRepository.create(product);

    await expect(
      sut.execute({
        id: "product-01",
        userId: "different-user-id-for-this-product",
      }),
    ).rejects.toThrowError(ProductNotFoundForThisUser);
  });
});
