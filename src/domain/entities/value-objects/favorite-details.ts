import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { ValueObject } from "@/shared/entity/value-object";

interface FavoriteDetailsProps {
  favoriteId: UniqueEntityId;
  productId: UniqueEntityId;
  userId: UniqueEntityId;
  attachmentUrl?: string | null;
  title: string;
  category: string;
  price: number;
}

export class FavoriteDetails extends ValueObject<FavoriteDetailsProps> {
  get favoriteId() {
    return this.props.favoriteId;
  }

  get productId() {
    return this.props.productId;
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

  get category() {
    return this.props.category;
  }

  get price() {
    return this.props.price;
  }

  static create(props: FavoriteDetailsProps) {
    return new FavoriteDetails(props);
  }
}
