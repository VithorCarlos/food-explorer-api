import { InMemoryProductsRepository } from "test/repositories/in-memory-products-repository";
import { CreateFavoriteUseCase } from "./create-favorite";
import { InMemoryFavoritesRepository } from "test/repositories/in-memory-favorites-repository";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { makeUser } from "test/factories/make-user";
import { makeProduct } from "test/factories/make-product";
import { InMemoryProductAttachmentRepository } from "test/repositories/in-memory-product-attachment-repository";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { makeFavorite } from "test/factories/make-favorite";
import { ProductNotFoundForThisUser } from "@/domain/errors/product-not-found-for-this-user";

let sut: CreateFavoriteUseCase;
let inMemoryFavoritesRepository: InMemoryFavoritesRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryProductsRepository: InMemoryProductsRepository;
let inMemoryProductAttachmentRepository: InMemoryProductAttachmentRepository;

describe("Create favorite", () => {
  beforeEach(() => {
    inMemoryProductAttachmentRepository =
      new InMemoryProductAttachmentRepository();
    inMemoryProductsRepository = new InMemoryProductsRepository(
      inMemoryProductAttachmentRepository,
    );
    inMemoryFavoritesRepository = new InMemoryFavoritesRepository(
      inMemoryProductsRepository,
    );
    inMemoryUsersRepository = new InMemoryUsersRepository();

    sut = new CreateFavoriteUseCase(
      inMemoryFavoritesRepository,
      inMemoryProductsRepository,
    );
  });

  it("Should be able to create a new favorite", async () => {
    const createUser = makeUser({ id: new UniqueEntityId("user-01") });
    const createProduct = makeProduct(
      {
        id: new UniqueEntityId("product-01"),
        attachmentId: new UniqueEntityId("attachment-01"),
      },
      createUser.id,
    );

    await inMemoryUsersRepository.create(createUser);
    await inMemoryProductsRepository.create(createProduct);

    const favorite = await sut.execute({
      userId: createUser.id.toString(),
      productId: createProduct.id.toString(),
    });

    expect(favorite?.userId.toString()).toEqual("user-01");
    expect(favorite?.productId.toString()).toEqual("product-01");

    expect(inMemoryFavoritesRepository.items[0].userId.toString()).toEqual(
      "user-01",
    );
    expect(inMemoryFavoritesRepository.items[0].productId.toString()).toEqual(
      "product-01",
    );
  });

  it("should not be able to create a favorite to an-existent product", async () => {
    const favorite = makeFavorite(
      {
        productId: new UniqueEntityId("product-01"),
        userId: new UniqueEntityId("user-01"),
      },
      new UniqueEntityId("favorite-01"),
    );
    const createUser = makeUser({ id: new UniqueEntityId("user-01") });

    await inMemoryFavoritesRepository.create(favorite);
    await inMemoryUsersRepository.create(createUser);

    await expect(
      sut.execute({
        productId: "no existent",
        userId: createUser.id.toString(),
      }),
    ).rejects.toThrowError(ProductNotFoundForThisUser);
  });
});
