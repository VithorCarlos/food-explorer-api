import { InMemoryFavoritesRepository } from "test/repositories/in-memory-favorites-repository";
import { makeFavorite } from "test/factories/make-favorite";
import { FindManyFavoriteUseCase } from "./find-many-favorites";
import { InMemoryProductsRepository } from "test/repositories/in-memory-products-repository";
import { InMemoryProductAttachmentRepository } from "test/repositories/in-memory-product-attachment-repository";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { makeProduct } from "test/factories/make-product";

let sut: FindManyFavoriteUseCase;
let inMemoryFavoritesRepository: InMemoryFavoritesRepository;
let inMemoryProductsRepository: InMemoryProductsRepository;
let inMemoryProductAttachmentRepository: InMemoryProductAttachmentRepository;

describe("Find many favorites", () => {
  beforeEach(() => {
    inMemoryProductAttachmentRepository =
      new InMemoryProductAttachmentRepository();
    inMemoryProductsRepository = new InMemoryProductsRepository(
      inMemoryProductAttachmentRepository,
    );
    inMemoryFavoritesRepository = new InMemoryFavoritesRepository(
      inMemoryProductsRepository,
    );
    sut = new FindManyFavoriteUseCase(inMemoryFavoritesRepository);
  });

  it("Should be able to find many favorites", async () => {
    for (let i = 1; i <= 12; i++) {
      await inMemoryProductsRepository.create(
        makeProduct(
          {
            attachmentId: new UniqueEntityId(`attachment-${i}`),
            userId: new UniqueEntityId("user-01"),
          },
          new UniqueEntityId(`product-${i}`),
        ),
      );
      await inMemoryFavoritesRepository.create(
        makeFavorite(
          {
            userId: new UniqueEntityId("user-01"),
            productId: new UniqueEntityId(`product-${i}`),
          },
          new UniqueEntityId(`favorite-${i}`),
        ),
      );
    }
    const { favorites } = await sut.execute({
      userId: "user-01",
      page: 2,
    });

    expect(favorites?.data).toHaveLength(2);
    expect(favorites?.pagination.total).toEqual(2);
    expect(inMemoryFavoritesRepository.items).toHaveLength(12);
  });
});
