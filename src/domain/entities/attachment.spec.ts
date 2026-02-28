import { Attachment } from "./attachment";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";

describe("Attachment entity", () => {
  it("Should be able to create attachment entity", () => {
    const attachment = Attachment.create(
      {
        title: "sample.png",
        url: "https://sample-image.png",
        createdAt: new Date(),
      },
      new UniqueEntityId(),
    );

    expect(attachment).toBeDefined();
  });
});
