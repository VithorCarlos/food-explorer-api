import { randomUUID } from "node:crypto";
import { Attachment } from "./attachment";
import { AttachmentLink } from "./attachment-link";

describe("Attachment entity", () => {
  it("Should be able to create attachment entity", () => {
    const attachment = Attachment.create({
      id: randomUUID(),
      title: "sample.png",
      url: "https://sample-image.png",
      created_at: new Date(),
      expires_at: new Date(Date.now() + 1000 * 60 * 60),
    });

    const attachmentLink = AttachmentLink.create({
      id: randomUUID(),
      attachmentId: attachment.id,
      resourceId: "1",
      resourceType: "SNACK",
      linked_at: new Date(),
    });

    expect(attachmentLink).toBeDefined();
  });
});
