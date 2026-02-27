import { Favorite } from "@/domain/entities/favorite";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { Prisma } from "generated/prisma/browser";
import { Favorite as RowFavorites } from "generated/prisma/client";

export interface CustomBindProps {
  favoriteId: string;
  productId: string;
  userId: string;
  title: string;
  category: string;
  ingredients: string[];
  price: number;
  description: string;
}

export class PrismaFavoriteAdapter {
  static toPrisma({
    id,
    productId,
    userId,
  }: Favorite): Prisma.FavoriteUncheckedCreateInput {
    return {
      id: id.toString(),
      productId: productId.toString(),
      userId: userId.toString(),
    };
  }

  static toDomain({ id, userId, productId }: RowFavorites) {
    return Favorite.create(
      {
        productId: new UniqueEntityId(productId),
        userId: new UniqueEntityId(userId),
      },
      new UniqueEntityId(id),
    );
  }
}
