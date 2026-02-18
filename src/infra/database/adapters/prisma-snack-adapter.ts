import { Snack } from "@/domain/entities/snack";
import { FOOD_CATEGORIES } from "@/domain/enums/food-categories";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { Prisma, Snack as RowSnacks } from "generated/prisma/client";

export class PrismaSnackAdapter {
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
  }: Snack): Prisma.SnackUncheckedCreateInput {
    return {
      id: id.toString(),
      title,
      category,
      ingredients,
      userId: userId.toString(),
      price,
      description,
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
  }: RowSnacks) {
    return Snack.create(
      {
        title,
        category: category as FOOD_CATEGORIES,
        ingredients,
        userId: new UniqueEntityId(userId),
        price,
        description,
        createdAt,
        updatedAt,
      },
      new UniqueEntityId(id),
    );
  }
}
