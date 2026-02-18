import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { BaseEntity } from "../../shared/entity/base-identity";

export interface FavoriteProps {
  userId: UniqueEntityId;
  snackId: UniqueEntityId;
}

export class Favorite extends BaseEntity<FavoriteProps> {
  static create(props: FavoriteProps, id?: UniqueEntityId) {
    const favorite = new Favorite(
      {
        ...props,
      },
      id,
    );

    return favorite;
  }

  get userId() {
    return this.props.userId;
  }

  get snackId() {
    return this.props.snackId;
  }
}
