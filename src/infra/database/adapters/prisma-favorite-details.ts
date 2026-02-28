import { FavoriteDetails } from "@/domain/entities/value-objects/favorite-details";
import { PRODUCT_CATEGORIES } from "@/domain/enums/product-categories";
import { env } from "@/env";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";

interface PrismaFavoriteDetails {
  favorite_id: string;
  product_id: string;
  user_id: string;
  attachment_url: string | null;
  title: string;
  category: PRODUCT_CATEGORIES;
  price: number;
}

export class PrismaFavoriteDetailsAdapter {
  static toDomain(raw: PrismaFavoriteDetails): FavoriteDetails {
    return FavoriteDetails.create({
      favoriteId: new UniqueEntityId(raw.favorite_id),
      productId: new UniqueEntityId(raw.product_id),
      userId: new UniqueEntityId(raw.user_id),
      attachmentUrl: raw.attachment_url
        ? `${env.CLOUDFARE_PUBLIC_CDN}/${raw.attachment_url}`
        : null,
      title: raw.title,
      category: raw.category,
      price: raw.price,
    });
  }
}
