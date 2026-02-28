import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { BaseEntity } from "../../shared/entity/base-identity";

export interface UserAttachmentProps {
  attachmentId: UniqueEntityId;
  userId: UniqueEntityId;
}

export class UserAttachment extends BaseEntity<UserAttachmentProps> {
  static create(props: UserAttachmentProps, id?: UniqueEntityId) {
    const userAttachment = new UserAttachment(props, id);

    return userAttachment;
  }

  get attachmentId() {
    return this.props.attachmentId;
  }

  get userId() {
    return this.props.userId;
  }
}
