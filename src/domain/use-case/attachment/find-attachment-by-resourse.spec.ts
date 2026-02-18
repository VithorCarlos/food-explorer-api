import { FindAttachmentByResourceUseCase } from "./find-attachment-by-resourse";
import { InMemorySnacksRepository } from "test/repositories/in-memory-snacks-repository";
import { makeSnack } from "test/factories/make-snack";
import { AttachmentNotFoundError } from "@/domain/errors/attachment-not-found";
import { InMemoryAttachmentRepository } from "test/repositories/in-memory-attachment-repository";
import { InMemoryAttachmentLinkRepository } from "test/repositories/in-memory-attachment-link-repository";
import { makeAttachment } from "test/factories/make-attachment";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";

let sut: FindAttachmentByResourceUseCase;
let inMemorySnackRepository: InMemorySnacksRepository;
let inMemoryAttachmentRepository: InMemoryAttachmentRepository;
let inMemoryAttachmentLinkRepository: InMemoryAttachmentLinkRepository;

describe("Find attachment by resource", () => {
  beforeEach(() => {
    inMemoryAttachmentLinkRepository = new InMemoryAttachmentLinkRepository();
    inMemorySnackRepository = new InMemorySnacksRepository(
      inMemoryAttachmentLinkRepository,
    );
    inMemoryAttachmentRepository = new InMemoryAttachmentRepository();
    sut = new FindAttachmentByResourceUseCase(inMemoryAttachmentLinkRepository);
  });

  it("Should be able to find an attachment by resource", async () => {
    const attachment = makeAttachment({ title: "food.png" });

    const snack = makeSnack(
      { id: new UniqueEntityId("snack-01"), attachmentId: attachment.id },
      new UniqueEntityId("user-01"),
    );

    await inMemorySnackRepository.create(snack);

    await inMemoryAttachmentRepository.create(attachment);

    const { attachmentLinks } = await sut.execute({
      resourceId: snack.id.toString(),
      resourceType: "SNACK",
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
        resourceId: inMemorySnackRepository.items[0].id,
      }),
    );

    expect(attachmentLinks).toHaveLength(1);
  });

  it("Should not be possible to find unexistent attachment", async () => {
    await expect(
      sut.execute({
        resourceId: "1",
        resourceType: "SNACK",
      }),
    ).rejects.toThrowError(AttachmentNotFoundError);
  });
});
