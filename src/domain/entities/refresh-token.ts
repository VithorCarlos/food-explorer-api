import { BaseEntity } from "@/shared/entity/base-identity";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";

interface RefreshTokenProps {
  userId: string;
  expiresIn: number;
}

export class RefreshToken extends BaseEntity<RefreshTokenProps> {
  static create(props: RefreshTokenProps, id?: UniqueEntityId) {
    return new RefreshToken(
      {
        ...props,
      },
      id,
    );
  }

  get userId() {
    return this.props.userId;
  }

  get expiresIn() {
    return this.props.expiresIn;
  }
}
