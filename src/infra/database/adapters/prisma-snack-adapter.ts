import { Snack } from "@/domain/entities/snack";
import { FOOD_CATEGORIES } from "@/domain/enums/food-categories";
import { Snack as RowSnacks } from "generated/prisma/client";

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
  }: Snack) {
    return {
      id,
      title,
      category,
      ingredients,
      userId,
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
    return Snack.create({
      id,
      title,
      category: category as FOOD_CATEGORIES,
      ingredients,
      userId,
      price,
      description,
      createdAt,
      updatedAt,
    });
  }
}
