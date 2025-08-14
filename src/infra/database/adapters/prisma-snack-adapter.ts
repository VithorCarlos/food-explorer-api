import { Snack } from "@/domain/entities/snack";
import { FOOD_CATEGORIES } from "@/domain/enums/food-categories";
import { snacks as RowSnacks } from "@prisma/client";

export class PrismaSnackAdapter {
  static toPrisma({
    id,
    title,
    category,
    ingredients,
    userId,
    price,
    attachment,
    description,
    updated_at,
  }: Snack) {
    return {
      id,
      title,
      category,
      ingredients,
      userId,
      price,
      attachment,
      description,
      updated_at,
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
    created_at,
    updated_at,
  }: RowSnacks) {
    return Snack.create({
      id,
      title,
      category: category as FOOD_CATEGORIES,
      ingredients,
      userId,
      price,
      description,
      created_at,
      updated_at,
    });
  }
}
