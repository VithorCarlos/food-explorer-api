import { InMemoryFavoritesRepository } from "test/repositories/in-memory-favorites-repository";
import { DeleteFavoriteUseCase } from "./delete-favorite";
import { FavoriteDoesNotExists } from "@/domain/errors/favorite-does-not-exists";
import { makeFavorite } from "test/factories/make-favorite";
import { FavoriteNotFoundForThisUser } from "@/domain/errors/favorite-not-found-for-this-user";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { makeUser } from "test/factories/make-user";
import { InMemoryProductsRepository } from "test/repositories/in-memory-products-repository";
import { InMemoryAttachmentLinkRepository } from "test/repositories/in-memory-attachment-link-repository";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { makeProduct } from "test/factories/make-product";

let sut: DeleteFavoriteUseCase;
let inMemoryFavoritesRepository: InMemoryFavoritesRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryProductsRepository: InMemoryProductsRepository;
let inMemoryAttachmentLinkRepository: InMemoryAttachmentLinkRepository;

describe("Delete favorite", () => {
  beforeEach(() => {
    inMemoryAttachmentLinkRepository = new InMemoryAttachmentLinkRepository();
    inMemoryProductsRepository = new InMemoryProductsRepository(
      inMemoryAttachmentLinkRepository,
    );
    inMemoryFavoritesRepository = new InMemoryFavoritesRepository(
      inMemoryProductsRepository,
    );
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new DeleteFavoriteUseCase(inMemoryFavoritesRepository);

    inMemoryUsersRepository.create(
      makeUser({ id: new UniqueEntityId("user-01") }),
    );

    inMemoryProductsRepository.create(
      makeProduct(
        { attachmentId: new UniqueEntityId("attachment-01") },
        new UniqueEntityId("user-01"),
      ),
    );
  });

  it("Should be able to delete an favorite", async () => {
    await inMemoryFavoritesRepository.create(
      makeFavorite(
        {
          userId: new UniqueEntityId("user-01"),
          productId: new UniqueEntityId("product-01"),
        },
        new UniqueEntityId("favorite-01"),
      ),
    );

    await inMemoryFavoritesRepository.create(
      makeFavorite(
        {
          userId: new UniqueEntityId("user-02"),
          productId: new UniqueEntityId("product-02"),
        },
        new UniqueEntityId("favorite-02"),
      ),
    );

    await sut.execute({
      productId: "product-01",
      userId: "user-01",
    });

    expect(inMemoryFavoritesRepository.items).toHaveLength(1);
    expect(inMemoryFavoritesRepository.items[0].productId.toString()).toEqual(
      "product-01",
    );
  });

  it("It should not be possible to delete a non-existent favorite", async () => {
    await expect(
      sut.execute({
        productId: "product-01",
        userId: "user-01",
      }),
    ).rejects.toThrowError(FavoriteDoesNotExists);
  });

  it("Should not be possible to delete a favorite with different user Id created for this one", async () => {
    const favorite = makeFavorite(
      {
        productId: new UniqueEntityId("product-01"),
        userId: new UniqueEntityId("user-01"),
      },
      new UniqueEntityId("favorite-01"),
    );

    await inMemoryFavoritesRepository.create(favorite);

    await expect(
      sut.execute({
        productId: "product-01",
        userId: "different-user-id-for-this-product",
      }),
    ).rejects.toThrowError(FavoriteNotFoundForThisUser);
  });
});
