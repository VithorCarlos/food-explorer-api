import { FindAttachmentByResourceUseCase } from "./find-attachment-by-resourse";
import { InMemorySnacksRepository } from "test/repositories/in-memory-snacks-repository";
import { makeSnack } from "test/factories/make-snack";
import { AttachmentNotFoundError } from "@/domain/errors/attachment-not-found";
import { InMemoryAttachmentRepository } from "test/repositories/in-memory-attachment-repository";
import { InMemoryAttachmentLinkRepository } from "test/repositories/in-memory-attachment-link-repository";
import { makeAttachment } from "test/factories/make-attachment";
import { makeAttachmentLink } from "test/factories/make-attachment-link";

let sut: FindAttachmentByResourceUseCase;
let inMemorySnackRepository: InMemorySnacksRepository;
let inMemoryAttachmentRepository: InMemoryAttachmentRepository;
let inMemoryAttachmentLinkRepository: InMemoryAttachmentLinkRepository;

describe("Find attachment by resource", () => {
  beforeEach(() => {
    inMemorySnackRepository = new InMemorySnacksRepository();
    inMemoryAttachmentRepository = new InMemoryAttachmentRepository();
    inMemoryAttachmentLinkRepository = new InMemoryAttachmentLinkRepository();
    sut = new FindAttachmentByResourceUseCase(inMemoryAttachmentLinkRepository);
  });

  it("Should be able to find an attachment by resource", async () => {
    const snack = makeSnack();

    const attachment = makeAttachment({ title: "food.png" });

    const attachmentLink = makeAttachmentLink(attachment.id, {
      resourceId: snack.id,
      resourceType: "SNACK",
    });

    await inMemorySnackRepository.create(snack);

    await inMemoryAttachmentRepository.create(attachment);

    await inMemoryAttachmentLinkRepository.createLink(attachmentLink);

    const { attachmentLinks } = await sut.execute({
      resourceId: inMemorySnackRepository.items[0].id,
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
