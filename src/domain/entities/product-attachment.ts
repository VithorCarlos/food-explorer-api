import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { BaseEntity } from "../../shared/entity/base-identity";

export interface ProductAttachmentProps {
  isMain: boolean;
  position: number;
  attachmentId: UniqueEntityId;
  productId: UniqueEntityId;
}

export class ProductAttachment extends BaseEntity<ProductAttachmentProps> {
  static create(props: ProductAttachmentProps, id?: UniqueEntityId) {
    const productAttachment = new ProductAttachment(props, id);

    return productAttachment;
  }

  get isMain() {
    return this.props.isMain;
  }

  set isMain(isMain: boolean) {
    this.props.isMain = isMain;
  }

  get position() {
    return this.props.position;
  }

  set position(position: number) {
    this.props.position = position;
  }

  get attachmentId() {
    return this.props.attachmentId;
  }

  get productId() {
    return this.props.productId;
  }
}
