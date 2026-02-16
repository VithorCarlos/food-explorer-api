import { Favorite } from "@/domain/entities/favorite";
import { FavoritesRepository } from "@/domain/repositories/favorites-repository";
import { PaginationParams } from "@/shared/pagination-params";
import { makeSnack } from "../factories/make-snack";

export class InMemoryFavoritesRepository implements FavoritesRepository {
  public items: Favorite[] = [];

  async findById(id: string) {
    const item = this.items.find((item) => item.id === id);

    if (!item) {
      return null;
    }

    return item;
  }

  async findBySnackId(id: string) {
    const item = this.items.find((item) => item.snackId === id);

    if (!item) {
      return null;
    }

    return item;
  }

  async findMany({ page, perPage }: PaginationParams, userId: string) {
    const mockSnack = makeSnack({}, userId);

    const filteredItems = this.items
      .filter((item) => item.userId === userId)
      .slice((page - 1) * perPage, page * perPage);

    return filteredItems.map(({ snackId, id, userId }) => ({
      snackId,
      favoriteId: id,
      userId,
      title: mockSnack.title,
      category: mockSnack.category,
      ingredients: mockSnack.ingredients,
      price: mockSnack.price,
      description: mockSnack.description,
      updated_at: new Date(),
    }));
  }

  async create(data: Favorite) {
    this.items.push(data);
  }

  async delete(id: string) {
    const itemIndex = this.items.findIndex((item) => item.id === id);

    this.items.splice(itemIndex, 1);
  }
}
