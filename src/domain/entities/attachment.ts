import { BaseEntity } from "../../shared/entity/base-identity";
import { Optional } from "@/shared/optional";
import dayjs from "dayjs";
import { ATTACHMENT_STATUS } from "generated/prisma/enums";
import { randomUUID } from "node:crypto";

export interface AttachmentProps {
  id: string;
  title: string;
  url: string;
  createdAt?: Date;
  expiresAt?: Date | null;
  status: ATTACHMENT_STATUS;
}

export class Attachment extends BaseEntity<AttachmentProps> {
  static create(props: Optional<AttachmentProps, "id">) {
    const attachment = new Attachment({
      ...props,
      id: props.id || randomUUID(),
      createdAt: props.createdAt ?? new Date(),
      expiresAt: dayjs().add(1, "day").toDate() ?? props.expiresAt,
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

  get createdAt() {
    return this.props.createdAt;
  }

  get expiresAt() {
    return this.props.expiresAt;
  }

  get status() {
    return this.props.status;
  }
}
