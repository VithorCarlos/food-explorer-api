import { Snack } from "@prisma/client";
import { SnacksRepository } from "../domain/repositories/snacks-repository";
import { PaginationParams } from "@/shared/pagination-params";

class InMemorySnacksRepository implements SnacksRepository {
  private items: Snack[] = [];

  async findById(id: string) {
    const item = this.items.find((item) => item.id === id);

    if (!item) {
      return null;
    }

    return item;
  }

  async searchMany({ page, query, perPage = 20 }: PaginationParams) {
    return this.items
      .filter(
        (item) =>
          item.ingredients.some((ingredient) => ingredient.includes(query)) ||
          item.title.includes(query)
      )
      .slice((page - 1) * perPage, page * perPage);
  }

  async create(data: Snack) {
    this.items.push(data);
  }

  async save(data: Snack) {
    const itemIndex = this.items.findIndex((item) => item.id === data.id);

    this.items[itemIndex] = data;
  }

  async delete(id: string) {
    const itemIndex = this.items.findIndex((item) => item.id === id);

    this.items.splice(itemIndex, 1);
  }
}

export { InMemorySnacksRepository };
