import { PaginationParams } from "@/shared/pagination-params";
import { Snack } from "../entities/snack";
import { SnackWithAttachment } from "../entities/value-objects/snack-with-attachment";
import { FOOD_CATEGORIES } from "../enums/food-categories";

export interface FindSnacksProps {
  id: string;
  userId: string;
}

export interface SearchManySnacksParams extends PaginationParams {
  title?: string;
  category?: string;
  ingredients?: string[];
}

export interface SnacksRepository {
  findById(id: string): Promise<Snack | null>;
  findByIdWithAttachment(id: string): Promise<SnackWithAttachment | null>;
  searchMany(props: SearchManySnacksParams): Promise<Snack[]>;
  searchManyWithAttachments(
    props: SearchManySnacksParams,
  ): Promise<SnackWithAttachment[]>;
  findActiveCategories(): Promise<FOOD_CATEGORIES[]>;
  create(snack: Snack): Promise<void>;
  update(snack: Snack): Promise<void>;
  delete(id: string): Promise<void>;
}
