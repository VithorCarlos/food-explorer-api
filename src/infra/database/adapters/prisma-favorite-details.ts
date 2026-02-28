import { FavoriteDetails } from "@/domain/entities/value-objects/favorite-details";
import { PRODUCT_CATEGORIES } from "@/domain/enums/product-categories";
import { env } from "@/env";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { Decimal } from "generated/prisma/internal/prismaNamespace";

interface PrismaFavoriteDetails {
  id: string;
  userId: string;
  productId: string;
  product: {
    title: string;
    category: keyof typeof PRODUCT_CATEGORIES;
    price: Decimal;
    productAttachments: {
      attachment: {
        url: string;
      };
    }[];
  };
}

export class PrismaFavoriteDetailsAdapter {
  static toDomain(raw: PrismaFavoriteDetails): FavoriteDetails {
    const attachment = raw.product?.productAttachments[0]?.attachment;
    return FavoriteDetails.create({
      title: raw.product.title,
      category: raw.product.category,
      price: Number(raw.product.price),
      favoriteId: new UniqueEntityId(raw.id),
      productId: new UniqueEntityId(raw.productId),
      userId: new UniqueEntityId(raw.userId),
      ...(attachment && {
        attachmentUrl: attachment.url
          ? `${env.CLOUDFARE_PUBLIC_CDN}/${attachment.url}`
          : null,
      }),
    });
  }
}
