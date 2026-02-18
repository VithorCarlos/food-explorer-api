import { FavoriteDetails } from "@/domain/entities/value-objects/favorite-details";
import { FOOD_CATEGORIES } from "@/domain/enums/food-categories";
import { env } from "@/env";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";

interface PrismaFavoriteDetails {
  favorite_id: string;
  snack_id: string;
  user_id: string;
  attachment_url: string | null;
  title: string;
  category: FOOD_CATEGORIES;
  ingredients: string[];
  price: number;
  description: string;
}

export class PrismaFavoriteDetailsAdapter {
  static toDomain(raw: PrismaFavoriteDetails): FavoriteDetails {
    return FavoriteDetails.create({
      favoriteId: new UniqueEntityId(raw.favorite_id),
      snackId: new UniqueEntityId(raw.snack_id),
      userId: new UniqueEntityId(raw.user_id),
      attachmentUrl: raw.attachment_url
        ? `${env.CLOUDFARE_PUBLIC_CDN}/${raw.attachment_url}`
        : null,
      title: raw.title,
      category: raw.category,
      ingredients: raw.ingredients,
      price: raw.price,
      description: raw.description,
    });
  }
}
