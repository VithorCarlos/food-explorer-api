import { PaginationParams } from "@/shared/pagination-params";
import { Favorite } from "../entities/favorite";
import { FavoriteDetails } from "../entities/value-objects/favorite-details";

export interface FavoritesRepository {
  findById(id: string): Promise<Favorite | null>;
  findByUserAndSnackId(
    userId: string,
    snackId: string,
  ): Promise<Favorite | null>;
  findMany(
    params: PaginationParams,
    userId: String,
  ): Promise<FavoriteDetails[] | null>;
  create(favorite: Favorite): Promise<void>;
  delete(id: string): Promise<void>;
}
