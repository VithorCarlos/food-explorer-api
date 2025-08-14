import { BaseEntity } from "@/shared/entity/base-identity";
import { Optional } from "@/shared/optional";
import { $Enums } from "@prisma/client";
import { randomUUID } from "node:crypto";

interface AttachmentLinkProps {
  id: string;
  attachmentId: string;
  resourceId: string;
  resourceType: $Enums.RESOURSE_TYPE;
  linked_at?: Date;
}

export class AttachmentLink extends BaseEntity<AttachmentLinkProps> {
  static create(props: Optional<AttachmentLinkProps, "id" | "linked_at">) {
    return new AttachmentLink({
      ...props,
      id: props.id ?? randomUUID(),
      linked_at: props.linked_at ?? new Date(),
    });
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

  get linked_at() {
    return this.props.linked_at;
  }
}
