import { User } from "@/domain/entities/user";
import { UsersRepository } from "../domain/repositories/users-repository";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async findById(id: string) {
    const item = this.items.find((item) => item.id === id);

    if (!item) {
      return null;
    }

    return item;
  }

  async findByEmail(email: string) {
    const item = this.items.find((item) => item.email === email);

    if (!item) {
      return null;
    }

    return item;
  }

  async create(data: User) {
    this.items.push(data);
  }

  async save(data: User) {
    const itemIndex = this.items.findIndex((item) => item.id === data.id);

    if (itemIndex >= 0) {
      this.items[itemIndex] = data;
    }
  }

  async delete(id: string) {
    const itemIndex = this.items.findIndex((item) => item.id === id);

    this.items.splice(itemIndex, 1);
  }
}
