import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { ValueObject } from "@/shared/entity/value-object";

interface FavoriteDetailsProps {
  favoriteId: UniqueEntityId;
  productId: UniqueEntityId;
  userId: UniqueEntityId;
  attachmentUrl?: string | null;
  title: string;
  category: string;
  ingredients?: string[];
  price: number;
  description?: string;
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

  static create(props: FavoriteDetailsProps) {
    return new FavoriteDetails(props);
  }
}
