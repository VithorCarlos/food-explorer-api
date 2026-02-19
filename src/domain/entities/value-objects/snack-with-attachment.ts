import { FOOD_CATEGORIES } from "@/domain/enums/food-categories";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { ValueObject } from "@/shared/entity/value-object";

interface SnackWithAttachmentProps {
  snackId: UniqueEntityId;
  attachmentUrl: string | null;
  attachmentId: UniqueEntityId;
  title: string;
  description: string;
  category: FOOD_CATEGORIES;
  ingredients: string[];
  price: number;
  userId: UniqueEntityId;
  createdAt: Date;
  updatedAt?: Date;
}

export class SnackWithAttachment extends ValueObject<SnackWithAttachmentProps> {
  get snackId() {
    return this.props.snackId;
  }

  get attachmentUrl() {
    return this.props.attachmentUrl;
  }

  get attachmentId() {
    return this.props.attachmentId;
  }

  get title() {
    return this.props.title;
  }

  get description() {
    return this.props.description;
  }

  get category() {
    return this.props.category;
  }

  get ingredients() {
    return this.props.ingredients;
  }

  get price() {
    return this.props.price;
  }

  get userId() {
    return this.props.userId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
  static create(props: SnackWithAttachmentProps) {
    return new SnackWithAttachment(props);
  }
}
