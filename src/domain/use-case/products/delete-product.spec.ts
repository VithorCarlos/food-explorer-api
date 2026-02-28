import { InMemoryProductsRepository } from "test/repositories/in-memory-products-repository";
import { makeProduct } from "test/factories/make-product";
import { DeleteProductUseCase } from "./delete-product";
import { ProductDoesNotExists } from "@/domain/errors/product-does-not-exists";
import { ProductNotFoundForThisUser } from "@/domain/errors/product-not-found-for-this-user";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { InMemoryProductAttachmentRepository } from "test/repositories/in-memory-product-attachment-repository";
import { OnProductAttachmentChanged } from "@/domain/subscribers/on-product-attachment-changed";
import { FakerUploader } from "test/storage/faker-uploader";
import { InMemoryAttachmentRepository } from "test/repositories/in-memory-attachment-repository";
import { makeAttachment } from "test/factories/make-attachment";

let sut: DeleteProductUseCase;
let inMemoryProductAttachmentRepository: InMemoryProductAttachmentRepository;
let inMemoryProductsRepository: InMemoryProductsRepository;
let fakerUploader: FakerUploader;
let inMemoryAttachmentRepository: InMemoryAttachmentRepository;

describe("Delete product", () => {
  beforeEach(() => {
    inMemoryAttachmentRepository = new InMemoryAttachmentRepository();

    fakerUploader = new FakerUploader();

    inMemoryProductAttachmentRepository =
      new InMemoryProductAttachmentRepository(inMemoryAttachmentRepository);

    inMemoryProductsRepository = new InMemoryProductsRepository(
      inMemoryProductAttachmentRepository,
    );

    sut = new DeleteProductUseCase(inMemoryProductsRepository);

    new OnProductAttachmentChanged(inMemoryAttachmentRepository, fakerUploader);
  });

  it("Should be able to delete an product", async () => {
    const attachment1 = makeAttachment({}, new UniqueEntityId("attachment-1"));
    const attachment2 = makeAttachment({}, new UniqueEntityId("attachment-2"));

    await inMemoryAttachmentRepository.create(attachment1);
    await inMemoryAttachmentRepository.create(attachment2);

    fakerUploader.upload({
      fileName: attachment1.url,
      body: Buffer.from("test-file.png"),
      fileType: "png",
    });

    fakerUploader.upload({
      fileName: attachment2.url,
      body: Buffer.from("test-file2.png"),
      fileType: "png",
    });

    const product1 = makeProduct(
      {
        id: new UniqueEntityId("product-01"),
        attachmentId: attachment1.id,
      },
      new UniqueEntityId("user-01"),
    );

    const product2 = makeProduct(
      {
        id: new UniqueEntityId("product-02"),
        attachmentId: attachment2.id,
      },
      new UniqueEntityId("user-02"),
    );

    await inMemoryProductsRepository.create(product1);

    await inMemoryProductsRepository.create(product2);

    await sut.execute({
      id: "product-01",
      userId: "user-01",
    });

    expect(inMemoryProductsRepository.items).toHaveLength(1);
    expect(inMemoryAttachmentRepository.items).toHaveLength(1);
    expect(fakerUploader.uploads).toHaveLength(1);

    expect(inMemoryProductAttachmentRepository.items).toHaveLength(1);
    expect(
      inMemoryProductAttachmentRepository.items[0].attachmentId,
    ).not.toEqual("attachment-01");
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
