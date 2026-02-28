import { FavoritesRepository } from "@/domain/repositories/favorites-repository";
import { PrismaFavoriteAdapter } from "../adapters/prisma-favorite-adapter";
import { PaginationParams } from "@/shared/pagination-params";
import { Favorite } from "@/domain/entities/favorite";
import { PrismaService } from "../prisma";
import { PrismaFavoriteDetailsAdapter } from "../adapters/prisma-favorite-details";
import { PaginatedResponse } from "@/shared/paginated-response";
import { FavoriteDetails } from "@/domain/entities/value-objects/favorite-details";

export class PrismaFavoritesRepository implements FavoritesRepository {
  constructor(private prisma: PrismaService) {}

  async findByProductId(productId: string) {
    const favorite = await this.prisma.favorite.findFirst({
      where: { productId },
    });

    if (!favorite) {
      return null;
    }

    return PrismaFavoriteAdapter.toDomain(favorite);
  }

  async findByUserAndProductId(userId: string, productId: string) {
    const favorite = await this.prisma.favorite.findFirst({
      where: { userId, productId },
    });

    if (!favorite) {
      return null;
    }

    return PrismaFavoriteAdapter.toDomain(favorite);
  }

  async findMany(
    { page, perPage }: PaginationParams,
    userId: string,
  ): Promise<PaginatedResponse<FavoriteDetails>> {
    const [favorites, total] = await Promise.all([
      this.prisma.favorite.findMany({
        where: { userId },
        include: {
          product: {
            select: {
              category: true,
              price: true,
              title: true,
              productAttachments: {
                take: 1,
                where: { isMain: true },
                select: { attachment: { select: { url: true } } },
              },
            },
          },
        },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      this.prisma.favorite.count({ where: { userId } }),
    ]);

    const hasMore = page * perPage < total;

    return {
      data: favorites.map(PrismaFavoriteDetailsAdapter.toDomain),
      pagination: {
        hasMore,
        total,
        nextPage: hasMore ? page + 1 : null,
      },
    };
  }

  async create(data: Favorite) {
    const favorite = PrismaFavoriteAdapter.toPrisma(data);
    await this.prisma.favorite.create({ data: favorite });
  }

  async delete(productId: string, userId: string) {
    await this.prisma.favorite.deleteMany({
      where: {
        productId,
        userId,
      },
    });
  }
}
