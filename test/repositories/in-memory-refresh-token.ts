import { RefreshToken } from "@/domain/entities/refresh-token";
import { RefreshTokenRepository } from "@/domain/repositories/refresh-token-repository";

export class InMemoryRefreshTokenRepository implements RefreshTokenRepository {
  public items: RefreshToken[] = [];

  async findByUserId(userId: string) {
    const item = this.items.find((item) => item.userId === userId);

    if (!item) {
      return null;
    }

    return item;
  }

  async findById(id: string) {
    const item = this.items.find((item) => item.id === id);

    if (!item) {
      return null;
    }

    return item;
  }

  async create(refreshToken: RefreshToken) {
    this.items.push(refreshToken);
  }

  async delete(id: string) {
    const itemIndex = this.items.findIndex((item) => item.id === id);

    this.items.splice(itemIndex, 1);
  }

  async update(data: RefreshToken) {
    const itemIndex = this.items.findIndex((item) => item.id === data.id);

    this.items[itemIndex] = data;
  }
}
