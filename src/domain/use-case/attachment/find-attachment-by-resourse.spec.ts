import { FindAttachmentByResourceUseCase } from "./find-attachment-by-resourse";
import { InMemoryProductsRepository } from "test/repositories/in-memory-products-repository";
import { makeProduct } from "test/factories/make-product";
import { AttachmentNotFoundError } from "@/domain/errors/attachment-not-found";
import { InMemoryAttachmentRepository } from "test/repositories/in-memory-attachment-repository";
import { InMemoryAttachmentLinkRepository } from "test/repositories/in-memory-attachment-link-repository";
import { makeAttachment } from "test/factories/make-attachment";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { RESOURSE_TYPE } from "@/domain/enums/resource-type";

let sut: FindAttachmentByResourceUseCase;
let inMemoryProductRepository: InMemoryProductsRepository;
let inMemoryAttachmentRepository: InMemoryAttachmentRepository;
let inMemoryAttachmentLinkRepository: InMemoryAttachmentLinkRepository;

describe("Find attachment by resource", () => {
  beforeEach(() => {
    inMemoryAttachmentLinkRepository = new InMemoryAttachmentLinkRepository();
    inMemoryProductRepository = new InMemoryProductsRepository(
      inMemoryAttachmentLinkRepository,
    );
    inMemoryAttachmentRepository = new InMemoryAttachmentRepository();
    sut = new FindAttachmentByResourceUseCase(inMemoryAttachmentLinkRepository);
  });

  it("Should be able to find an attachment by resource", async () => {
    const attachment = makeAttachment({ title: "food.png" });

    const product = makeProduct(
      { id: new UniqueEntityId("product-01"), attachmentId: attachment.id },
      new UniqueEntityId("user-01"),
    );

    await inMemoryProductRepository.create(product);

    await inMemoryAttachmentRepository.create(attachment);

    const { attachmentLinks } = await sut.execute({
      resourceId: product.id.toString(),
      resourceType: RESOURSE_TYPE.PRODUCT,
    });

    expect(inMemoryAttachmentRepository.items[0]).toEqual(
      expect.objectContaining({ title: "food.png" }),
    );

    expect(attachmentLinks[0]).toEqual(
      expect.objectContaining({
        attachmentId: inMemoryAttachmentRepository.items[0].id,
      }),
    );

    expect(attachmentLinks[0]).toEqual(
      expect.objectContaining({
        resourceId: inMemoryProductRepository.items[0].id,
      }),
    );

    expect(attachmentLinks).toHaveLength(1);
  });

  it("Should not be possible to find unexistent attachment", async () => {
    await expect(
      sut.execute({
        resourceId: "1",
        resourceType: RESOURSE_TYPE.PRODUCT,
      }),
    ).rejects.toThrowError(AttachmentNotFoundError);
  });
});
