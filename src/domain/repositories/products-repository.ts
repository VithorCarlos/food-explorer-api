import { PaginationParams } from "@/shared/pagination-params";
import { Product } from "../entities/product";
import { PaginatedResponse } from "@/shared/paginated-response";
import { ProductWithAttachment } from "../entities/value-objects/product-with-attachment";
import { PRODUCT_CATEGORIES } from "generated/prisma/enums";

export interface FindProductsProps {
  id: string;
  userId: string;
}

export interface SearchManyProductsParams extends PaginationParams {
  title?: string;
  category?: PRODUCT_CATEGORIES;
  ingredients?: string[];
}

export interface ProductsRepository {
  findById(id: string): Promise<Product | null>;
  findByIdWithAttachment(id: string): Promise<ProductWithAttachment | null>;
  searchMany(
    props: SearchManyProductsParams,
  ): Promise<PaginatedResponse<Product>>;
  searchManyWithAttachments(
    props: SearchManyProductsParams,
  ): Promise<PaginatedResponse<ProductWithAttachment>>;
  findActiveCategories(): Promise<PRODUCT_CATEGORIES[]>;
  create(product: Product): Promise<void>;
  update(product: Product): Promise<void>;
  delete(id: string): Promise<void>;
}
