import { BaseEntity } from "../../shared/entity/base-identity";
import { Optional } from "@/shared/optional";
import { randomUUID } from "node:crypto";

export interface AttachmentProps {
  id: string;
  title: string;
  url: string;
}

export class Attachment extends BaseEntity<AttachmentProps> {
  static create(props: Optional<AttachmentProps, "id">) {
    const attachment = new Attachment({
      ...props,
      id: props.id || randomUUID(),
    });

    return attachment;
  }

  get title() {
    return this.props.title;
  }

  get url() {
    return this.props.url;
  }
}
