import { InMemoryUploadAttachment } from "test/in-memory-upload-attachment-repository";
import { FindAttachmentByResourceUseCase } from "./find-attachment-by-resourse";
import { InMemorySnacksRepository } from "test/in-memory-snacks-repository";
import { makeSnack } from "test/factories/make-snack";
import { Attachment } from "@/domain/entities/attachment";
import { AttachmentNotFoundError } from "@/domain/errors/attachment-not-found";

let sut: FindAttachmentByResourceUseCase;
let inMemoryUploadAttachment: InMemoryUploadAttachment;
let inMemorySnackRepository: InMemorySnacksRepository;

describe("Find attachment by resource", () => {
  beforeEach(() => {
    inMemoryUploadAttachment = new InMemoryUploadAttachment();
    inMemorySnackRepository = new InMemorySnacksRepository();
    sut = new FindAttachmentByResourceUseCase(inMemoryUploadAttachment);
  });

  it("Should be able to find an attachment by resource", async () => {
    const snack = makeSnack();

    const attachment = Attachment.create({
      title: "food.png",
      url: "image/png",
      created_at: new Date(),
    });

    await inMemorySnackRepository.create(snack);

    await inMemoryUploadAttachment.create(attachment);

    const { attachments } = await sut.execute({
      resourceId: inMemorySnackRepository.items[0].id,
      resourceType: "SNACK",
    });

    expect(attachments[0]).toEqual(
      expect.objectContaining({ title: "food.png" }),
    );

    expect(attachments[0]).toEqual(
      expect.objectContaining({
        title: inMemoryUploadAttachment.items[0].title,
      }),
    );

    expect(attachments).toHaveLength(1);
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
