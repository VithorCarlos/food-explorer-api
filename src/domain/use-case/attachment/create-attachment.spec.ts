import { InvalidAttachmentTypeError } from "@/domain/errors/invalid-attachment-type";
import { CreateAttachmentUseCase } from "./create-attachment";
import { FakerUploader } from "test/storage/faker-uploader";
import { InMemoryAttachmentRepository } from "test/repositories/in-memory-attachment-repository";

let sut: CreateAttachmentUseCase;
let inMemoryAttachmentRepository: InMemoryAttachmentRepository;
let fakeUploader: FakerUploader;

describe("Upload and create attachment", () => {
  beforeEach(() => {
    inMemoryAttachmentRepository = new InMemoryAttachmentRepository();
    fakeUploader = new FakerUploader();
    sut = new CreateAttachmentUseCase(
      inMemoryAttachmentRepository,
      fakeUploader,
    );
  });

  it("Should be able to upload and create an attachment", async () => {
    const { attachment } = await sut.execute({
      fileName: "food.png",
      fileType: "image/png",
      body: Buffer.from(""),
    });

    expect(attachment).toEqual(expect.objectContaining({ title: "food.png" }));

    expect(attachment).toEqual(
      expect.objectContaining({
        title: inMemoryAttachmentRepository.items[0].title,
      }),
    );
    expect(fakeUploader.uploads).toHaveLength(1);
    expect(fakeUploader.uploads[0]).toEqual(
      expect.objectContaining({ fileName: "food.png" }),
    );
  });

  it("Should not be possible to upload attachment with a invalid filetype", async () => {
    await expect(
      sut.execute({
        fileName: "food.pdf",
        fileType: "image/pdf",
        body: Buffer.from(""),
      }),
    ).rejects.toThrowError(InvalidAttachmentTypeError);
  });
});
