import { BaseEntity } from "../../shared/entity/base-identity";
import { Optional } from "@/shared/optional";
import { PRODUCT_CATEGORIES } from "../enums/product-categories";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { AttachmentLink } from "./attachment-link";
import { RESOURSE_TYPE } from "../enums/resource-type";

export interface ProductProps {
  title: string;
  description?: string;
  attachmentLink?: AttachmentLink;
  category: PRODUCT_CATEGORIES;
  ingredients?: string[];
  price: number;
  userId: UniqueEntityId;
  createdAt: Date;
  updatedAt?: Date;
}

export class Product extends BaseEntity<ProductProps> {
  static create(
    props: Optional<ProductProps, "createdAt">,
    id?: UniqueEntityId,
  ) {
    const product = new Product(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return product;
  }

  get title() {
    return this.props.title;
  }

  set title(title: string) {
    this.props.title = title;
    this.touch();
  }

  get description(): string | undefined {
    return this.props.description;
  }

  set description(description: string) {
    this.props.description = description;
    this.touch();
  }

  get attachmentLink(): AttachmentLink | undefined {
    return this.props.attachmentLink;
  }

  set attachmentLink(attachmentLink: AttachmentLink) {
    this.props.attachmentLink = attachmentLink;
    this.touch();
  }

  get category() {
    return this.props.category;
  }

  set category(category: PRODUCT_CATEGORIES) {
    this.props.category = category;
    this.touch();
  }

  get ingredients() {
    return this.props.ingredients ?? [];
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
      resourceType: RESOURSE_TYPE.PRODUCT,
      linkedAt: new Date(),
    });

    this.attachmentLink = attachmentLink;
  }
}
