import { UniqueEntityId } from "./unique-entity-id";

export class BaseEntity<Props> {
  private _id: UniqueEntityId;

  protected props: Props;

  get id() {
    return this._id;
  }

  protected constructor(props: Props, id?: UniqueEntityId) {
    this.props = props;
    this._id = id ?? new UniqueEntityId(id);
  }

  public equals(entity: BaseEntity<unknown>) {
    if (entity === this) {
      return true;
    }

    if (entity.id === this._id) {
      return true;
    }

    return false;
  }
}
