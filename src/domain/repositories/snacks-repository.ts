import { PaginationParams } from "@/shared/pagination-params";
import { Snack } from "../entities/snack";

export interface SnacksRepository {
  findById(id: string): Promise<Snack | null>;
  searchMany(props: PaginationParams): Promise<Snack[]>;
  create(snack: Snack): Promise<void>;
  save(snack: Snack): Promise<void>;
  delete(id: string): Promise<void>;
}
