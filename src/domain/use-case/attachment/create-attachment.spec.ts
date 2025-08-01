import { InvalidAttachmentTypeError } from "@/domain/errors/invalid-attachment-type";
import { CreateAttachmentUseCase } from "./create-attachment";
import { InMemoryUploadAttachment } from "@/test/in-memory-upload-attachment-repository";
import { FakerUploader } from "@/test/storage/faker-uploader";

let sut: CreateAttachmentUseCase;
let inMemoryUploadAttachment: InMemoryUploadAttachment;
let fakeUploader: FakerUploader;

describe("Upload and create attachment", () => {
  beforeEach(() => {
    inMemoryUploadAttachment = new InMemoryUploadAttachment();
    fakeUploader = new FakerUploader();
    sut = new CreateAttachmentUseCase(inMemoryUploadAttachment, fakeUploader);
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
        title: inMemoryUploadAttachment.items[0].title,
      })
    );
    expect(fakeUploader.uploads).toHaveLength(1);
    expect(fakeUploader.uploads[0]).toEqual(
      expect.objectContaining({ fileName: "food.png" })
    );
  });

  it("Should not be possible to upload attachment with a invalid filetype", async () => {
    await expect(
      sut.execute({
        fileName: "food.pdf",
        fileType: "image/pdf",
        body: Buffer.from(""),
      })
    ).rejects.toThrowError(InvalidAttachmentTypeError);
  });
});
