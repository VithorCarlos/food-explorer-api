import { BaseEntity } from "@/shared/entity/base-identity";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { Optional } from "@/shared/optional";
import { RESOURSE_TYPE } from "../enums/resource-type";

export interface AttachmentLinkProps {
  attachmentId: UniqueEntityId;
  resourceId: UniqueEntityId;
  resourceType: RESOURSE_TYPE;
  linkedAt: Date;
}

export class AttachmentLink extends BaseEntity<AttachmentLinkProps> {
  static create(
    props: Optional<AttachmentLinkProps, "linkedAt">,
    id?: UniqueEntityId,
  ) {
    return new AttachmentLink(
      {
        ...props,
        linkedAt: props.linkedAt ?? new Date(),
      },
      id,
    );
  }

  get attachmentId() {
    return this.props.attachmentId;
  }

  get resourceId() {
    return this.props.resourceId;
  }

  get resourceType() {
    return this.props.resourceType;
  }

  get linkedAt() {
    return this.props.linkedAt;
  }
}
