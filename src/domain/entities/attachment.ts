import { BaseEntity } from "../../shared/entity/base-identity";
import { Optional } from "@/shared/optional";
import { randomUUID } from "node:crypto";

export interface AttachmentProps {
  id: string;
  title: string;
  url: string;
  created_at?: Date;
}

export class Attachment extends BaseEntity<AttachmentProps> {
  static create(props: Optional<AttachmentProps, "id">) {
    const attachment = new Attachment({
      ...props,
      id: props.id || randomUUID(),
    });

    return attachment;
  }

  get id() {
    return this.props.id;
  }

  get title() {
    return this.props.title;
  }

  get url() {
    return this.props.url;
  }

  get created_at() {
    return this.props.created_at;
  }
}
