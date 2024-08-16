import { PaginationParams } from "@/shared/pagination-params";
import { Favorite } from "../entities/favorite";
import { CustomBindProps } from "@/infra/database/adapters/prisma-favorite-adapter";

export interface FavoritesRepository {
  findById(id: string): Promise<Favorite | null>;
  findBySnackId(id: string): Promise<Favorite | null>;
  findMany(
    params: PaginationParams,
    userId: String
  ): Promise<CustomBindProps[]>;
  create(favorite: Favorite): Promise<void>;
  delete(id: string): Promise<void>;
}
