import { BaseEntity } from "../../shared/entity/base-identity";
import { Optional } from "@/shared/optional";
import { randomUUID } from "node:crypto";
import { FOOD_CATEGORIES } from "../enums/food-categories";
import { AttachmentLink } from "./attachment-link";

export interface SnackProps {
  id: string;
  title: string;
  description: string;
  attachmentLink?: AttachmentLink;
  category: FOOD_CATEGORIES;
  ingredients: string[];
  price: number;
  userId: string;
  createdAt: Date;
  updatedAt?: Date;
}

interface SaveSnacksProps {
  title?: string;
  description?: string;
  category?: FOOD_CATEGORIES;
  ingredients?: string[];
  price?: number;
  attachmentLink?: AttachmentLink;
}

export class Snack extends BaseEntity<SnackProps> {
  static create(props: Optional<SnackProps, "id" | "createdAt">) {
    const snack = new Snack({
      ...props,
      id: props.id || randomUUID(),
      createdAt: props.createdAt ?? new Date(),
    });

    return snack;
  }

  get id() {
    return this.props.id;
  }

  get title() {
    return this.props.title;
  }

  get description() {
    return this.props.description;
  }

  get attachmentLink() {
    return this.props.attachmentLink;
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

  private touch() {
    this.props.updatedAt = new Date();
  }

  public update({
    title,
    description,
    category,
    ingredients,
    price,
    attachmentLink,
  }: SaveSnacksProps) {
    this.props.title = title ?? this.title;

    this.props.description = description ?? this.description;

    this.props.category = category ?? this.category;

    this.props.ingredients = ingredients ?? this.ingredients;

    this.props.price = price ?? this.price;

    this.props.attachmentLink = attachmentLink ?? this.attachmentLink;

    this.touch();
  }
}
