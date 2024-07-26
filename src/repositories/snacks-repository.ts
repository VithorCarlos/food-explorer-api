import { PaginationParams } from "@/core/shared/pagination-params";
import { Snack } from "@prisma/client";

export interface SnacksRepository {
  findById(id: string): Promise<Snack | null>;
  searchMany(props: PaginationParams): Promise<Snack[] | null>;
  create(snack: Snack): Promise<void>;
  save(snack: Snack): Promise<void>;
  delete(id: string): Promise<void>;
}
