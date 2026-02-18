import { BaseEntity } from "../../shared/entity/base-identity";
import { Optional } from "@/shared/optional";
import { FOOD_CATEGORIES } from "../enums/food-categories";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { AttachmentLink } from "./attachment-link";
import { RESOURSE_TYPE } from "generated/prisma/enums";

export interface SnackProps {
  title: string;
  description: string;
  attachmentLink?: AttachmentLink;
  category: FOOD_CATEGORIES;
  ingredients: string[];
  price: number;
  userId: UniqueEntityId;
  createdAt: Date;
  updatedAt?: Date;
}

export class Snack extends BaseEntity<SnackProps> {
  static create(props: Optional<SnackProps, "createdAt">, id?: UniqueEntityId) {
    const snack = new Snack(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return snack;
  }

  get title() {
    return this.props.title;
  }

  set title(title: string) {
    this.props.title = title;
    this.touch();
  }

  get description() {
    return this.props.description;
  }

  set description(description: string) {
    this.props.description = description;
    this.touch();
  }

  get attachmentLink() {
    return this.props.attachmentLink!;
  }

  set attachmentLink(attachmentLink: AttachmentLink) {
    this.props.attachmentLink = attachmentLink;
    this.touch();
  }

  get category() {
    return this.props.category;
  }

  set category(category: FOOD_CATEGORIES) {
    this.props.category = category;
    this.touch();
  }

  get ingredients() {
    return this.props.ingredients;
  }

  set ingredients(ingredients: string[]) {
    this.props.ingredients = ingredients;
    this.touch();
  }

  get price() {
    return this.props.price;
  }

  set price(price: number) {
    if (price < 0) throw new Error();

    this.props.price = price;
    this.touch();
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

  private touch() {
    this.props.updatedAt = new Date();
  }

  changeAttachment(attachmentId: UniqueEntityId) {
    const attachmentLink = AttachmentLink.create({
      attachmentId,
      resourceId: this.id,
      resourceType: RESOURSE_TYPE.SNACK,
      linkedAt: new Date(),
    });

    this.attachmentLink = attachmentLink;
  }
}
