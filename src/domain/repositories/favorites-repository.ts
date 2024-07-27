import { PaginationParams } from "@/shared/pagination-params";
import { Favorite } from "../entities/favorite";

export interface FavoritesRepository {
  findById(id: string): Promise<Favorite | null>;
  findMany({ page, perPage }: PaginationParams): Promise<Favorite[]>;
  create(favorite: Favorite): Promise<void>;
  delete(id: string): Promise<void>;
}
