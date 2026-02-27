import { Favorite } from "@/domain/entities/favorite";
import { FavoritesRepository } from "@/domain/repositories/favorites-repository";
import { PaginationParams } from "@/shared/pagination-params";
import { InMemoryProductsRepository } from "./in-memory-products-repository";
import { FavoriteDetails } from "@/domain/entities/value-objects/favorite-details";
import { PaginatedResponse } from "@/shared/paginated-response";

export class InMemoryFavoritesRepository implements FavoritesRepository {
  constructor(private productsRepository: InMemoryProductsRepository) {}
  public items: Favorite[] = [];

  async findByProductId(productId: string) {
    const item = this.items.find(
      (item) => item.productId.toString() === productId,
    );

    if (!item) {
      return null;
    }

    return item;
  }

  async findByUserAndProductId(userId: string, productId: string) {
    const item = this.items.find(
      (item) =>
        item.userId.toString() === userId &&
        item.productId.toString() === productId,
    );

    if (!item) {
      return null;
    }

    return item;
  }

  async findMany(
    { page, perPage }: PaginationParams,
    userId: string,
  ): Promise<PaginatedResponse<FavoriteDetails>> {
    const filteredItems = this.items
      .filter((item) => item.userId.toString() === userId)
      .slice((page - 1) * perPage, page * perPage);

    const favorite = this.productsRepository.items.find(
      (item) => item.userId.toString() === userId,
    );

    if (!favorite) {
      return {
        data: [],
        pagination: {
          hasMore: false,
          nextPage: null,
          total: 0,
        },
      };
    }

    const itemsIds = new Set(filteredItems.map((item) => item.id));
    const total = itemsIds.size;
    const hasMore = page * perPage < total;

    return {
      data: filteredItems.map(({ productId, id, userId }) =>
        FavoriteDetails.create({
          productId,
          favoriteId: id,
          userId,
          attachmentUrl: favorite.attachmentLink?.attachmentId + ".png",
          title: favorite.title,
          category: favorite.category,
          ingredients: favorite.ingredients,
          price: favorite.price,
          ...(favorite.description && { description: favorite.description }),
        }),
      ),
      pagination: {
        hasMore,
        total,
        nextPage: hasMore ? page + 1 : null,
      },
    };
  }

  async create(data: Favorite) {
    this.items.push(data);
  }

  async delete(id: string) {
    const itemIndex = this.items.findIndex((item) => item.id.toString() === id);

    this.items.splice(itemIndex, 1);
  }
}
