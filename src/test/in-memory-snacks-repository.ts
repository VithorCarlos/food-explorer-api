import { Snack } from "@/domain/entities/snack";
import {
  SearchManySnacksParams,
  SnacksRepository,
} from "../domain/repositories/snacks-repository";

export class InMemorySnacksRepository implements SnacksRepository {
  public items: Snack[] = [];

  async findById(id: string) {
    const item = this.items.find((item) => item.id === id);

    if (!item) {
      return null;
    }

    return item;
  }

  async searchMany({
    page,
    perPage,
    category,
    title,
    ingredients,
  }: SearchManySnacksParams) {
    if (!title && (!ingredients || ingredients.length === 0)) {
      return this.items.slice((page - 1) * perPage, page * perPage);
    }

    return this.items
      .filter((item) => {
        if (category && item.category !== category) {
          return false;
        }

        if (title) {
          return item.title.includes(title);
        }

        if (Array.isArray(ingredients)) {
          return item.ingredients.some((ingredient) =>
            ingredients.some((q) => ingredient.includes(q))
          );
        }

        return false;
      })
      .slice((page - 1) * perPage, page * perPage);
  }

  async create(data: Snack) {
    this.items.push(data);
  }

  async update(data: Snack) {
    const itemIndex = this.items.findIndex((item) => item.id === data.id);

    this.items[itemIndex] = data;
  }

  async delete(id: string) {
    const itemIndex = this.items.findIndex((item) => item.id === id);

    this.items.splice(itemIndex, 1);
  }
}
