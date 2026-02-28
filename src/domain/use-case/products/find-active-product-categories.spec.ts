import { makeProduct } from "test/factories/make-product";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { FindActiveCategoriesUseCase } from "./find-active-product-categories";
import { PRODUCT_CATEGORIES } from "@/domain/enums/product-categories";
import { InMemoryProductsRepository } from "test/repositories/in-memory-products-repository";
import { InMemoryProductAttachmentRepository } from "test/repositories/in-memory-product-attachment-repository";

let sut: FindActiveCategoriesUseCase;
let inMemoryProductsRepository: InMemoryProductsRepository;
let inMemoryProductAttachmentRepository: InMemoryProductAttachmentRepository;

describe("Find Actice Categories", () => {
  beforeEach(() => {
    inMemoryProductAttachmentRepository =
      new InMemoryProductAttachmentRepository();
    inMemoryProductsRepository = new InMemoryProductsRepository(
      inMemoryProductAttachmentRepository,
    );
    sut = new FindActiveCategoriesUseCase(inMemoryProductsRepository);
  });

  it("Should return active categories", async () => {
    for (let i = 0; i < 4; i++) {
      await inMemoryProductsRepository.create(
        makeProduct(
          {
            attachmentId: new UniqueEntityId("attachment-01"),
            category: PRODUCT_CATEGORIES.MEATS,
          },
          new UniqueEntityId("user-01"),
        ),
      );

      await inMemoryProductsRepository.create(
        makeProduct(
          {
            attachmentId: new UniqueEntityId("attachment-02"),
            category: PRODUCT_CATEGORIES.BRAZILIAN,
          },
          new UniqueEntityId("user-01"),
        ),
      );
    }

    const { categories } = await sut.execute();

    expect(categories).toEqual(expect.arrayContaining(["MEATS", "BRAZILIAN"]));
    expect(categories).toHaveLength(2);
  });
});
