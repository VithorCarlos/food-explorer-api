import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { ValueObject } from "@/shared/entity/value-object";

interface FavoriteDetailsProps {
  favoriteId: UniqueEntityId;
  snackId: UniqueEntityId;
  userId: UniqueEntityId;
  attachmentUrl: string;
  title: string;
  category: string;
  ingredients: string[];
  price: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export class FavoriteDetails extends ValueObject<FavoriteDetailsProps> {
  get favoriteId() {
    return this.props.favoriteId;
  }

  get snackId() {
    return this.props.snackId;
  }

  get userId() {
    return this.props.userId;
  }

  get attachmentUrl() {
    return this.props.attachmentUrl;
  }

  get title() {
    return this.props.title;
  }

  get ingredients() {
    return this.props.ingredients;
  }

  get category() {
    return this.props.category;
  }

  get price() {
    return this.props.price;
  }

  get description() {
    return this.props.description;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  static create(props: FavoriteDetailsProps) {
    return new FavoriteDetails(props);
  }
}
