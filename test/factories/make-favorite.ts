import { Favorite, FavoriteProps } from "@/domain/entities/favorite";
import { PrismaFavoriteAdapter } from "@/infra/database/adapters/prisma-favorite-adapter";
import { PrismaService } from "@/infra/database/prisma";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";

export function makeFavorite(data: FavoriteProps, id?: UniqueEntityId) {
  const favorite = Favorite.create(
    {
      userId: data.userId,
      productId: data.productId,
    },
    id,
  );

  return favorite;
}

export class FavoriteFactory {
  constructor(private prisma: PrismaService) {}

  async makeFavoriteToPrisma(data: FavoriteProps): Promise<Favorite> {
    const favorite = makeFavorite(data);

    await this.prisma.favorite.create({
      data: PrismaFavoriteAdapter.toPrisma(favorite),
    });

    return favorite;
  }
}
