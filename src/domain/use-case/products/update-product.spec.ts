import { UdpateProductUseCase } from "./update-product";
import { makeProduct } from "test/factories/make-product";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { makeUser } from "test/factories/make-user";
import { PRODUCT_CATEGORIES } from "@/domain/enums/product-categories";
import { InMemoryAttachmentLinkRepository } from "test/repositories/in-memory-attachment-link-repository";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { InMemoryProductsRepository } from "test/repositories/in-memory-products-repository";
import { ProductDoesNotExists } from "@/domain/errors/product-does-not-exists";
import { ProductNotFoundForThisUser } from "@/domain/errors/product-not-found-for-this-user";

let sut: UdpateProductUseCase;
let inMemoryProductsRepository: InMemoryProductsRepository;
let inMemoryAttachmentLinkRepository: InMemoryAttachmentLinkRepository;

let inMemoryUsersRepository: InMemoryUsersRepository;

describe("Update product", () => {
  beforeEach(() => {
    inMemoryAttachmentLinkRepository = new InMemoryAttachmentLinkRepository();
    inMemoryProductsRepository = new InMemoryProductsRepository(
      inMemoryAttachmentLinkRepository,
    );
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new UdpateProductUseCase(inMemoryProductsRepository);
  });

  it("Should be able to update an product", async () => {
    const makedUser = makeUser({ id: new UniqueEntityId("user-01") });
    const makedProduct = makeProduct(
      {
        id: new UniqueEntityId("product-01"),
        attachmentId: new UniqueEntityId("attachment-01"),
      },
      makedUser.id,
    );
    await inMemoryUsersRepository.create(makedUser);
    await inMemoryProductsRepository.create(makedProduct);

    const { product } = await sut.execute({
      productId: "product-01",
      userId: "user-01",
      title: "my new product title",
      description: "my new product description",
      price: 500,
    });

    expect(product).toEqual(
      expect.objectContaining({
        title: "my new product title",
        description: "my new product description",
        price: 500,
      }),
    );

    expect(product.id.toString()).toEqual("product-01");
    expect(product.userId.toString()).toEqual("user-01");
  });

  it("Should be able to update an product with attachment", async () => {
    const makedUser = makeUser({ id: new UniqueEntityId("user-01") });
    const makedProduct = makeProduct(
      {
        id: new UniqueEntityId("product-01"),
        attachmentId: new UniqueEntityId("attachment-01"),
      },
      makedUser.id,
    );
    await inMemoryUsersRepository.create(makedUser);
    await inMemoryProductsRepository.create(makedProduct);

    const { product } = await sut.execute({
      productId: "product-01",
      userId: "user-01",
      attachmentId: "new-attachment",
    });

    expect(product.id.toString()).toEqual("product-01");

    expect(product.attachmentLink?.attachmentId.toString()).not.toEqual(
      "attachment-01",
    );

    expect(product.attachmentLink?.attachmentId.toString()).toEqual(
      "new-attachment",
    );
    expect(product.userId.toString()).toEqual("user-01");
  });

  it("Should be able to update only a product category", async () => {
    const makedUser = makeUser({ id: new UniqueEntityId("user-01") });
    const makedProduct = makeProduct(
      {
        id: new UniqueEntityId("product-01"),
        attachmentId: new UniqueEntityId("attachment-01"),
      },
      makedUser.id,
    );

    await inMemoryUsersRepository.create(makedUser);
    await inMemoryProductsRepository.create(makedProduct);

    const { product } = await sut.execute({
      productId: "product-01",
      userId: "user-01",
      category: PRODUCT_CATEGORIES.PIZZA,
    });

    expect(product).toEqual(
      expect.objectContaining({
        category: PRODUCT_CATEGORIES.PIZZA,
      }),
    );

    expect(product.id.toString()).toEqual("product-01");
    expect(product.userId.toString()).toEqual("user-01");
  });

  it("Should be able to update only a product ingredients", async () => {
    const makedUser = makeUser({
      id: new UniqueEntityId("user-01"),
    });
    const makedProduct = makeProduct(
      {
        id: new UniqueEntityId("product-01"),
        attachmentId: new UniqueEntityId("attachment-01"),
      },
      makedUser.id,
    );

    await inMemoryUsersRepository.create(makedUser);
    await inMemoryProductsRepository.create(makedProduct);

    const { product } = await sut.execute({
      productId: "product-01",
      userId: "user-01",
      ingredients: [
        "Beat egg whites and sugar until foamy",
        "Whip cream",
        "Fold together cream and egg yolks",
      ],
    });

    expect(product).toEqual(
      expect.objectContaining({
        ingredients: [
          "Beat egg whites and sugar until foamy",
          "Whip cream",
          "Fold together cream and egg yolks",
        ],
      }),
    );

    expect(product.id.toString()).toEqual("product-01");
    expect(product.userId.toString()).toEqual("user-01");
  });

  it("Should not be possible to update a non-existent product", async () => {
    const product = makeProduct({}, new UniqueEntityId("user-01"));

    await expect(
      sut.execute({
        productId: "unknow-product",
        userId: product.userId.toString(),
        title: product.title,
      }),
    ).rejects.toThrowError(ProductDoesNotExists);
  });

  it("Should not be possible to update a product with different user Id created for this one", async () => {
    const product = makeProduct(
      {
        id: new UniqueEntityId("product-01"),
        attachmentId: new UniqueEntityId("attachment-01"),
      },
      new UniqueEntityId("user-01"),
    );

    await inMemoryProductsRepository.create(product);

    await expect(
      sut.execute({
        productId: "product-01",
        userId: "different-user-id-for-this-product",
        title: product.title,
      }),
    ).rejects.toThrowError(ProductNotFoundForThisUser);
  });
});
