import { Attachment, AttachmentProps } from "@/domain/entities/attachment";
import { faker } from "@faker-js/faker";

export function makeAttachment(override: Partial<AttachmentProps> = {}) {
  const attachment = Attachment.create({
    title: faker.lorem.slug() + ".png",
    url: faker.image.url(),
    ...override,
  });

  return attachment;
}
