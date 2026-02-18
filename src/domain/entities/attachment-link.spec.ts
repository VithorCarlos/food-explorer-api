import { ATTACHMENT_STATUS, RESOURSE_TYPE } from "generated/prisma/enums";
import { Attachment } from "./attachment";
import { AttachmentLink } from "./attachment-link";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";

describe("Attachment entity", () => {
  it("Should be able to create attachment entity", () => {
    const attachment = Attachment.create({
      title: "sample.png",
      url: "https://sample-image.png",
      createdAt: new Date(),
      status: ATTACHMENT_STATUS.PENDING,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60),
    });

    const attachmentLink = AttachmentLink.create({
      attachmentId: attachment.id,
      resourceId: new UniqueEntityId("1"),
      resourceType: RESOURSE_TYPE.SNACK,
      linkedAt: new Date(),
    });

    expect(attachmentLink).toBeDefined();
  });
});
