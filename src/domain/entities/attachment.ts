import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { BaseEntity } from "../../shared/entity/base-identity";

export interface AttachmentProps {
  title: string;
  url: string;
  createdAt?: Date;
}

export class Attachment extends BaseEntity<AttachmentProps> {
  static create(props: AttachmentProps, id?: UniqueEntityId) {
    const attachment = new Attachment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return attachment;
  }

  get title() {
    return this.props.title;
  }

  set title(title: string) {
    this.props.title = title;
  }

  get url() {
    return this.props.url;
  }

  set url(url: string) {
    this.props.url = url;
  }

  get createdAt() {
    return this.props.createdAt;
  }
}
