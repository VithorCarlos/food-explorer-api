import { PaginationParams } from "@/shared/pagination-params";
import { Snack } from "../entities/snack";

export interface FindSnacksProps {
  id: string;
  userId: string;
}
export interface SnacksRepository {
  findById(id: string): Promise<Snack | null>;
  searchMany(props: PaginationParams): Promise<Snack[]>;
  create(snack: Snack): Promise<void>;
  update(snack: Snack): Promise<void>;
  delete(id: string): Promise<void>;
}
