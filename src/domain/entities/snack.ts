import { BaseEntity } from "../../shared/entity/base-identity";
import { Optional } from "@/shared/optional";
import { randomUUID } from "node:crypto";
import { FOOD_CATEGORIES } from "../enums/food-categories";
import { Attachment } from "./attachment";

export interface SnackProps {
  id: string;
  title: string;
  description: string;
  attachment?: Attachment;
  category: FOOD_CATEGORIES;
  ingredients: string[];
  price: number;
  userId: string;
  created_at: Date;
  updated_at?: Date;
}

interface SaveSnacksProps {
  title?: string;
  description?: string;
  category?: FOOD_CATEGORIES;
  ingredients?: string[];
  price?: number;
  attachment?: Attachment;
}

export class Snack extends BaseEntity<SnackProps> {
  static create(props: Optional<SnackProps, "id" | "created_at">) {
    const snack = new Snack({
      ...props,
      id: props.id || randomUUID(),
      created_at: props.created_at ?? new Date(),
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

  get attachment() {
    return this.props.attachment;
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

  get created_at() {
    return this.props.created_at;
  }

  get updated_at() {
    return this.props.updated_at;
  }

  private touch() {
    this.props.updated_at = new Date();
  }

  public update({
    title,
    description,
    category,
    ingredients,
    price,
    attachment,
  }: SaveSnacksProps) {
    this.props.title = title ?? this.title;

    this.props.description = description ?? this.description;

    this.props.category = category ?? this.category;

    this.props.ingredients = ingredients ?? this.ingredients;

    this.props.price = price ?? this.price;

    this.props.attachment = attachment ?? this.attachment;

    this.touch();
  }
}
