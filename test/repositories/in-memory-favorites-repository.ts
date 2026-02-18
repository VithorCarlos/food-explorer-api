import { Favorite } from "@/domain/entities/favorite";
import { FavoritesRepository } from "@/domain/repositories/favorites-repository";
import { PaginationParams } from "@/shared/pagination-params";
import { InMemorySnacksRepository } from "./in-memory-snacks-repository";
import { FavoriteDetails } from "@/domain/entities/value-objects/favorite-details";

export class InMemoryFavoritesRepository implements FavoritesRepository {
  constructor(private snacksRepository: InMemorySnacksRepository) {}
  public items: Favorite[] = [];

  async findById(id: string) {
    const item = this.items.find((item) => item.id.toString() === id);

    if (!item) {
      return null;
    }

    return item;
  }

  async findByUserAndSnackId(userId: string, snackId: string) {
    const item = this.items.find(
      (item) =>
        item.userId.toString() === userId &&
        item.snackId.toString() === snackId,
    );

    if (!item) {
      return null;
    }

    return item;
  }

  async findMany({ page, perPage }: PaginationParams, userId: string) {
    const filteredItems = this.items
      .filter((item) => item.userId.toString() === userId)
      .slice((page - 1) * perPage, page * perPage);

    const favorite = this.snacksRepository.items.find(
      (item) => item.userId.toString() === userId,
    );

    if (!favorite) {
      return null;
    }

    return filteredItems.map(({ snackId, id, userId }) =>
      FavoriteDetails.create({
        snackId,
        favoriteId: id,
        userId,
        attachmentUrl: favorite.attachmentLink.attachmentId + ".png",
        title: favorite.title,
        category: favorite.category,
        ingredients: favorite.ingredients,
        price: favorite.price,
        description: favorite.description,
        createdAt: favorite.createdAt,
        updatedAt: favorite.updatedAt!,
      }),
    );
  }

  async create(data: Favorite) {
    this.items.push(data);
  }

  async delete(id: string) {
    const itemIndex = this.items.findIndex((item) => item.id.toString() === id);

    this.items.splice(itemIndex, 1);
  }
}
