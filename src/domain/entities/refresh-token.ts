import { BaseEntity } from "@/shared/entity/base-identity";
import { Optional } from "@/shared/optional";
import { randomUUID } from "node:crypto";

interface RefreshTokenProps {
  id: string;
  userId: string;
  expiresIn: number;
}

export class RefreshToken extends BaseEntity<RefreshTokenProps> {
  static create(props: Optional<RefreshTokenProps, "id">) {
    return new RefreshToken({
      ...props,
      id: props.id ?? randomUUID(),
    });
  }

  get id() {
    return this.props.id;
  }

  get userId() {
    return this.props.userId;
  }

  get expiresIn() {
    return this.props.expiresIn;
  }
}
