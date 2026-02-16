import { FavoritesRepository } from "@/domain/repositories/favorites-repository";
import { PrismaFavoriteAdapter } from "../adapters/prisma-favorite-adapter";
import { PaginationParams } from "@/shared/pagination-params";
import { Favorite } from "@/domain/entities/favorite";
import { PrismaService } from "../prisma";

export class PrismaFavoritesRepository implements FavoritesRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    const favorite = await this.prisma.favorite.findFirst({ where: { id } });

    if (!favorite) {
      return null;
    }

    return PrismaFavoriteAdapter.toDomain(favorite);
  }

  async findBySnackId(snackId: string) {
    const favorite = await this.prisma.favorite.findFirst({
      where: {
        snackId,
      },
    });

    if (!favorite) {
      return null;
    }

    return PrismaFavoriteAdapter.toDomain(favorite);
  }

  async findMany({ page, perPage }: PaginationParams, userId: string) {
    const favorites = await this.prisma.favorite.findMany({
      where: { userId },
      skip: (page - 1) * perPage,
      include: { snack: true },
      orderBy: {
        snack: {
          title: "desc",
        },
      },
      take: perPage,
    });

    return favorites.map(({ id, snackId, snack }) =>
      PrismaFavoriteAdapter.toBind({
        snackId,
        favoriteId: id,
        title: snack.title,
        category: snack.category,
        ingredients: snack.ingredients,
        userId: snack.userId,
        price: snack.price,
        description: snack.description,
        updated_at: snack.updatedAt,
      }),
    );
  }

  async create(data: Favorite) {
    const favorite = PrismaFavoriteAdapter.toPrisma(data);
    await this.prisma.favorite.create({ data: favorite });
  }

  async delete(id: string) {
    await this.prisma.favorite.delete({
      where: {
        id,
      },
    });
  }
}
