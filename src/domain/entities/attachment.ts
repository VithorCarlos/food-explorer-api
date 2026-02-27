import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { BaseEntity } from "../../shared/entity/base-identity";
import dayjs from "dayjs";
import { ATTACHMENT_STATUS } from "../enums/attachment-status";

export interface AttachmentProps {
  title: string;
  url: string;
  createdAt?: Date;
  expiresAt?: Date | null;
  status: ATTACHMENT_STATUS;
}

export class Attachment extends BaseEntity<AttachmentProps> {
  static create(props: AttachmentProps, id?: UniqueEntityId) {
    const attachment = new Attachment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        expiresAt: props.expiresAt ?? dayjs().add(1, "day").toDate(),
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

  get expiresAt() {
    return this.props.expiresAt;
  }

  get status() {
    return this.props.status;
  }

  set status(status: ATTACHMENT_STATUS) {
    this.props.status = status;
  }
}
