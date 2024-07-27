import { Favorite } from "@/domain/entities/favorite";
import { FavoritesRepository } from "@/domain/repositories/favorites-repository";
import { PaginationParams } from "@/shared/pagination-params";

export class InMemoryFavoritesRepository implements FavoritesRepository {
  public items: Favorite[] = [];

  async findById(id: string) {
    const item = this.items.find((item) => item.id === id);

    if (!item) {
      return null;
    }

    return item;
  }

  async findMany({ page, perPage = 20 }: PaginationParams, userId: string) {
    return this.items
      .filter((item) => item.userId === userId)
      .slice((page - 1) * perPage, page * perPage);
  }

  async create(data: Favorite) {
    this.items.push(data);
  }

  async delete(id: string) {
    const itemIndex = this.items.findIndex((item) => item.id === id);

    this.items.splice(itemIndex, 1);
  }
}
