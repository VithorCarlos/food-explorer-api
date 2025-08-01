import { BaseEntity } from "@/shared/entity/base-identity";
import { Optional } from "@/shared/optional";
import { $Enums } from "@/prisma/generated";
import { randomUUID } from "node:crypto";

interface AttachmentLinkProps {
  id: string;
  attachmentId: string;
  resourceId: string;
  resourceType: $Enums.RESOURSE_TYPE;
  linkedAt?: Date;
}

export class AttachmentLink extends BaseEntity<AttachmentLinkProps> {
  static create(props: Optional<AttachmentLinkProps, "id" | "linkedAt">) {
    return new AttachmentLink({
      ...props,
      id: props.id ?? randomUUID(),
      linkedAt: props.linkedAt ?? new Date(),
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

  get linkedAt() {
    return this.props.linkedAt;
  }
}
