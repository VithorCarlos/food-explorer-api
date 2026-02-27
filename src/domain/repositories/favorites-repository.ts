import { PaginationParams } from "@/shared/pagination-params";
import { Favorite } from "../entities/favorite";
import { FavoriteDetails } from "../entities/value-objects/favorite-details";
import { PaginatedResponse } from "@/shared/paginated-response";

export interface FavoritesRepository {
  findByProductId(productId: string): Promise<Favorite | null>;
  findByUserAndProductId(
    userId: string,
    productId: string,
  ): Promise<Favorite | null>;
  findMany(
    params: PaginationParams,
    userId: string,
  ): Promise<PaginatedResponse<FavoriteDetails>>;
  create(favorite: Favorite): Promise<void>;
  delete(productId: string, userId: string): Promise<void>;
}
