import { randomUUID } from "node:crypto";
import { Attachment } from "./attachment";

describe("Attachment entity", () => {
  it("Should be able to create attachment entity", () => {
    const attachment = Attachment.create({
      id: randomUUID(),
      title: "sample.png",
      url: "https://sample-image.png",
      created_at: new Date(),
    });

    expect(attachment).toBeDefined();
  });
});
