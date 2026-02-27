import { SearchProductUseCase } from "./search-product";
import { makeProduct } from "test/factories/make-product";
import { InMemoryAttachmentLinkRepository } from "test/repositories/in-memory-attachment-link-repository";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { InMemoryProductsRepository } from "test/repositories/in-memory-products-repository";

let sut: SearchProductUseCase;
let inMemoryProductsRepository: InMemoryProductsRepository;
let inMemoryAttachmentLinkRepository: InMemoryAttachmentLinkRepository;

describe("Search many products", () => {
  beforeEach(async () => {
    inMemoryAttachmentLinkRepository = new InMemoryAttachmentLinkRepository();
    inMemoryProductsRepository = new InMemoryProductsRepository(
      inMemoryAttachmentLinkRepository,
    );
    sut = new SearchProductUseCase(inMemoryProductsRepository);

    for (let i = 1; i <= 12; i++) {
      const product = makeProduct(
        {
          title: `product-${i}`,
          ingredients: [`cheese-${i}`, `capchup-${i}`],
          attachmentId: new UniqueEntityId("attachment-" + i),
        },
        new UniqueEntityId("user-01"),
      );
      await inMemoryProductsRepository.create(product);
    }
  });

  afterEach(() => {
    inMemoryProductsRepository.items = [];
  });

  it("Should be able to search many products without query", async () => {
    const { products } = await sut.execute({
      page: 2,
      perPage: 5,
    });

    expect(products.data).toHaveLength(5);
    expect(inMemoryProductsRepository.items).toHaveLength(12);
  });

  it("Should be able to search many products filtering by title", async () => {
    const { products } = await sut.execute({
      page: 1,
      title: "product-5",
    });
    expect(products.data).toHaveLength(1);
    expect(products.data[0].title).toEqual("product-5");

    expect(inMemoryProductsRepository.items).toHaveLength(12);
  });

  it("Should be able to search many products filtering by igredients", async () => {
    await inMemoryProductsRepository.create(
      makeProduct(
        {
          title: "Product Doe",
          ingredients: ["rice", "sugar"],
          attachmentId: new UniqueEntityId("attachment-01"),
        },
        new UniqueEntityId("user-01"),
      ),
    );

    const { products } = await sut.execute({
      page: 1,
      ingredients: ["rice", "sugar"],
    });
    expect(products.data).toHaveLength(1);

    expect(products.data[0].ingredients).toEqual(
      expect.arrayContaining(["rice", "sugar"]),
    );

    expect(products.data[0].title).toEqual("Product Doe");
  });

  it("Should be able to search many products filtering by title and igredients", async () => {
    await inMemoryProductsRepository.create(
      makeProduct(
        {
          title: "Product Doe",
          ingredients: ["rice", "sugar"],
          attachmentId: new UniqueEntityId("attachment-01"),
        },
        new UniqueEntityId("user-01"),
      ),
    );

    const { products } = await sut.execute({
      page: 1,
      perPage: 10,
      title: "Product Doe",
      ingredients: ["rice", "sugar"],
    });

    expect(products.data).toHaveLength(1);

    expect(products.data[0].ingredients).toEqual(
      expect.arrayContaining(["rice", "sugar"]),
    );

    expect(products.data[0].title).toEqual("Product Doe");
  });
});
