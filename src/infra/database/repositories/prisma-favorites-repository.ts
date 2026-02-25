import { FavoritesRepository } from "@/domain/repositories/favorites-repository";
import { PrismaFavoriteAdapter } from "../adapters/prisma-favorite-adapter";
import { PaginationParams } from "@/shared/pagination-params";
import { Favorite } from "@/domain/entities/favorite";
import { PrismaService } from "../prisma";
import { PrismaFavoriteDetailsAdapter } from "../adapters/prisma-favorite-details";
import { Prisma } from "generated/prisma/client";
import { FOOD_CATEGORIES } from "@/domain/enums/food-categories";
import { PaginatedResponse } from "@/shared/paginated-response";
import { FavoriteDetails } from "@/domain/entities/value-objects/favorite-details";

export class PrismaFavoritesRepository implements FavoritesRepository {
  constructor(private prisma: PrismaService) {}

  async findBySnackId(snackId: string) {
    const favorite = await this.prisma.favorite.findFirst({
      where: { snackId },
    });

    if (!favorite) {
      return null;
    }

    return PrismaFavoriteAdapter.toDomain(favorite);
  }

  async findByUserAndSnackId(userId: string, snackId: string) {
    const favorite = await this.prisma.favorite.findFirst({
      where: { userId, snackId },
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
          snack_id: string;
          user_id: string;
          attachment_url: string | null;
          title: string;
          category: FOOD_CATEGORIES;
          ingredients: string[];
          price: number;
          description: string;
        }[]
      >(
        Prisma.sql`
          SELECT 
            f.id as favorite_id,
            f.user_id,
            s.id as snack_id,
            s.title,
            s.description,
            s.category,
            s.ingredients,
            s.price,
            al.attachment_id,
            a.url as attachment_url
          FROM favorites f
          INNER JOIN snacks s ON s.id = f.snack_id
          LEFT JOIN attachment_link al 
            ON al.resource_id = s.id
            AND al.resource_type = 'SNACK'
          LEFT JOIN attachment a
            ON a.id = al.attachment_id
          WHERE f.user_id = ${userId}
          ORDER BY s.title DESC
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

  async delete(snackId: string, userId: string) {
    await this.prisma.favorite.deleteMany({
      where: {
        snackId,
        userId,
      },
    });
  }
}
