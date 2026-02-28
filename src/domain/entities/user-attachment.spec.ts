import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { UserAttachment } from "./user-attachment";

describe("User attachment entity", () => {
  it("Should be able to create user attachment entity", () => {
    const userAttachment = UserAttachment.create(
      {
        attachmentId: new UniqueEntityId("user-1"),
        userId: new UniqueEntityId("user-1"),
      },
      new UniqueEntityId(),
    );

    expect(userAttachment).toBeDefined();
  });
});
