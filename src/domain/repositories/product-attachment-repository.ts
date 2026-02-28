import { ProductAttachment } from "../entities/product-attachment";

export interface ProductAttachmentDetails {
  attachmentId: string;
  productId: string;
  id: string;
  isMain: boolean;
  position: number;
  title: string;
  url: string;
}

export interface ProductAttachmentRepository {
  create(productAttachment: ProductAttachment): Promise<void>;
  delete(productAttachment: ProductAttachment): Promise<void>;
  findByProductId(productId: string): Promise<ProductAttachmentDetails | null>;
  deleteByProductId(productId: string): Promise<void>;
}
