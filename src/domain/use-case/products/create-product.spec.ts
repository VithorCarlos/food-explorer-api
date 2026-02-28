import { CreateProductUseCase } from "./create-product";
import { makeProduct } from "test/factories/make-product";
import { InMemoryProductAttachmentRepository } from "test/repositories/in-memory-product-attachment-repository";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { InMemoryProductsRepository } from "test/repositories/in-memory-products-repository";

let sut: CreateProductUseCase;
let inMemoryProductsRepository: InMemoryProductsRepository;
let inMemoryProductAttachmentRepository: InMemoryProductAttachmentRepository;

describe("Create product", () => {
  beforeEach(() => {
    inMemoryProductAttachmentRepository =
      new InMemoryProductAttachmentRepository();
    inMemoryProductsRepository = new InMemoryProductsRepository(
      inMemoryProductAttachmentRepository,
    );
    sut = new CreateProductUseCase(inMemoryProductsRepository);
  });

  it("Should be able to create a new product", async () => {
    const createProduct = makeProduct(
      { title: "product-1" },
      new UniqueEntityId("user-01"),
    );

    const { product } = await sut.execute({
      title: createProduct.title,
      category: createProduct.category,
      description: createProduct.description,
      ingredients: createProduct.ingredients,
      price: createProduct.price,
      attachmentId: "attachment-01",
      userId: createProduct.userId.toString(),
    });

    expect(product).toEqual(expect.objectContaining({ title: "product-1" }));
    expect(product.id.toString()).toEqual(expect.any(String));
    expect(product.attachment?.attachmentId).toEqual(
      new UniqueEntityId("attachment-01"),
    );
    expect(product.attachment?.productId).toEqual(product.id);

    expect(inMemoryProductsRepository.items[0].title).toEqual("product-1");
    expect(inMemoryProductsRepository.items[0].id).toEqual(product.id);
    expect(inMemoryProductAttachmentRepository.items).toEqual([
      product.attachment,
    ]);
    expect(inMemoryProductAttachmentRepository.items[0].attachmentId).toEqual(
      new UniqueEntityId("attachment-01"),
    );
  });
});
