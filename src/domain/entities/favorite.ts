import { BaseEntity } from "../../shared/entity/base-identity";
import { Optional } from "@/shared/optional";
import { randomUUID } from "node:crypto";

export interface FavoriteProps {
  id: string;
  userId: string;
  snackId: string;
}

export class Favorite extends BaseEntity<FavoriteProps> {
  static create(props: Optional<FavoriteProps, "id">) {
    const favorite = new Favorite({
      ...props,
      id: props.id || randomUUID(),
    });

    return favorite;
  }

  get id() {
    return this.props.id;
  }

  get userId() {
    return this.props.userId;
  }

  get snackId() {
    return this.props.snackId;
  }
}
