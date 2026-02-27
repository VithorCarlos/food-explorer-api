import { PRODUCT_CATEGORIES } from "@/domain/enums/product-categories";
import { ProductDoesNotExists } from "@/domain/errors/product-does-not-exists";
import { ProductNotFoundForThisUser } from "@/domain/errors/product-not-found-for-this-user";
import { ProductsRepository } from "@/domain/repositories/products-repository";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";

interface UdpateProductRequest {
  productId: string;
  attachmentId?: string;
  userId: string;
  title?: string;
  description?: string;
  category?: PRODUCT_CATEGORIES;
  ingredients?: string[];
  price?: number;
}

export class UdpateProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    productId,
    attachmentId,
    title,
    description,
    category,
    ingredients,
    price,
    userId,
  }: UdpateProductRequest) {
    const product = await this.productsRepository.findById(productId);

    if (!product) {
      throw new ProductDoesNotExists();
    }

    if (userId !== product.userId.toString()) {
      throw new ProductNotFoundForThisUser();
    }

    if (title) product.title = title;
    if (description) product.description = description;
    if (category) product.category = category;
    if (ingredients) product.ingredients = ingredients;
    if (price !== undefined) product.price = price;
    if (attachmentId !== undefined)
      product.changeAttachment(new UniqueEntityId(attachmentId));

    await this.productsRepository.update(product);

    return { product };
  }
}
