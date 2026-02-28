import { FavoritesRepository } from "@/domain/repositories/favorites-repository";
import { PrismaFavoriteAdapter } from "../adapters/prisma-favorite-adapter";
import { PaginationParams } from "@/shared/pagination-params";
import { Favorite } from "@/domain/entities/favorite";
import { PrismaService } from "../prisma";
import { PrismaFavoriteDetailsAdapter } from "../adapters/prisma-favorite-details";
import { Prisma } from "generated/prisma/client";
import { PRODUCT_CATEGORIES } from "@/domain/enums/product-categories";
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
      this.prisma.$queryRaw<
        {
          favorite_id: string;
          product_id: string;
          user_id: string;
          attachment_url: string | null;
          title: string;
          category: PRODUCT_CATEGORIES;
          price: number;
        }[]
      >(
        Prisma.sql`
          SELECT 
            f.id as favorite_id,
            f.product_id,
            f.user_id,
            p.id as product_id,
            p.title,
            p.category,
            p.price,
            al.attachment_id,
            a.url as attachment_url
          FROM favorites f
          INNER JOIN products p ON p.id = f.product_id
          LEFT JOIN attachment_link al 
            ON al.resource_id = p.id
            AND al.resource_type = 'PRODUCT'
          LEFT JOIN attachment a
            ON a.id = al.attachment_id
          WHERE f.user_id = ${userId}
          ORDER BY p.title DESC
          LIMIT ${perPage} 
          OFFSET ${(page - 1) * perPage}
          `,
      ),
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
