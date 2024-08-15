import { Snack } from "@/domain/entities/snack";
import { snacks as RowSnacks } from "@prisma/client";

export class PrismaSnackAdapter {
  static toPrisma({
    id,
    title,
    category,
    ingredients,
    userId,
    price,
    description,
    imageUrl,
    updated_at,
  }: Snack) {
    return {
      id,
      title,
      category,
      ingredients,
      userId,
      price,
      description,
      imageUrl,
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
    imageUrl,
    updated_at,
  }: RowSnacks) {
    return Snack.create({
      id,
      title,
      category,
      ingredients,
      userId,
      price,
      description,
      imageUrl,
      updated_at,
    });
  }
}
