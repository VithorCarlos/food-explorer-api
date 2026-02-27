import { Favorite } from "@/domain/entities/favorite";
import { ProductNotFoundForThisUser } from "@/domain/errors/product-not-found-for-this-user";
import { FavoritesRepository } from "@/domain/repositories/favorites-repository";
import { ProductsRepository } from "@/domain/repositories/products-repository";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";

interface CreateFavoriteRequest {
  userId: string;
  productId: string;
}

export class CreateFavoriteUseCase {
  constructor(
    private favoritesRepository: FavoritesRepository,
    private productsRepository: ProductsRepository,
  ) {}

  async execute({
    userId,
    productId,
  }: CreateFavoriteRequest): Promise<Favorite> {
    const product = await this.productsRepository.findById(productId);

    if (!product) {
      throw new ProductNotFoundForThisUser();
    }

    const alreadyFavorited =
      await this.favoritesRepository.findByUserAndProductId(userId, productId);

    if (alreadyFavorited) {
      return alreadyFavorited;
    }

    const favorite = Favorite.create({
      userId: new UniqueEntityId(userId),
      productId: new UniqueEntityId(productId),
    });

    await this.favoritesRepository.create(favorite);

    return favorite;
  }
}
