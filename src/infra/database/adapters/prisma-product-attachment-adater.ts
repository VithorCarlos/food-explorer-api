import { ProductAttachment } from "@/domain/entities/product-attachment";
import { ProductAttachmentDetails } from "@/domain/repositories/product-attachment-repository";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import {
  Prisma,
  ProductAttachment as RowProductAttachment,
} from "generated/prisma/client";

interface ProductAttachmentBindProps {
  attachmentId: string;
  productId: string;
  id: string;
  isMain: boolean;
  position: number;
  attachment: {
    id: string;
    url: string;
    title: string;
    createdAt?: Date;
  };
}

export class PrismaProductAttachmentAdapter {
  static toPrisma({
    attachmentId,
    productId,
    id,
    isMain,
    position,
  }: ProductAttachment): Prisma.ProductAttachmentUncheckedCreateInput {
    return {
      id: id.toString(),
      attachmentId: attachmentId.toString(),
      productId: productId.toString(),
      isMain,
      position,
    };
  }

  static toDomain({
    id,
    attachmentId,
    productId,
    isMain,
    position,
  }: RowProductAttachment) {
    return ProductAttachment.create(
      {
        attachmentId: new UniqueEntityId(attachmentId),
        productId: new UniqueEntityId(productId),
        isMain,
        position,
      },
      new UniqueEntityId(id),
    );
  }

  static bind({
    attachment,
    attachmentId,
    id,
    isMain,
    position,
    productId,
  }: ProductAttachmentBindProps): ProductAttachmentDetails {
    return {
      attachmentId,
      title: attachment.title,
      url: attachment.url,
      id,
      isMain,
      position,
      productId,
    };
  }
}
