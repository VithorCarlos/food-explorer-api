import { Product } from "@/domain/entities/product";
import { PRODUCT_CATEGORIES } from "@/domain/enums/product-categories";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import {
  Prisma,
  Product as RowProducts,
  $Enums,
} from "generated/prisma/client";

export class PrismaProductAdapter {
  static toPrisma({
    id,
    title,
    category,
    ingredients,
    userId,
    price,
    description,
    updatedAt,
    createdAt,
  }: Product): Prisma.ProductUncheckedCreateInput {
    return {
      id: id.toString(),
      title,
      category: category as $Enums.PRODUCT_CATEGORIES,
      ingredients,
      userId: userId.toString(),
      price,
      ...(description && { description }),
      createdAt,
      updatedAt,
    };
  }

  static toDomain({
    id,
    title,
    category,
    ingredients,
    userId,
    price,
    description,
    createdAt,
    updatedAt,
  }: RowProducts) {
    return Product.create(
      {
        title,
        category: category as PRODUCT_CATEGORIES,
        ingredients,
        userId: new UniqueEntityId(userId),
        price: Number(price),
        ...(description && { description }),
        createdAt,
        updatedAt,
      },
      new UniqueEntityId(id),
    );
  }
}
