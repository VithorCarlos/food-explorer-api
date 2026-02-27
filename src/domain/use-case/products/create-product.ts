import { Product } from "@/domain/entities/product";
import { PRODUCT_CATEGORIES } from "@/domain/enums/product-categories";
import { ProductsRepository } from "@/domain/repositories/products-repository";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";

interface CreateProductRequest {
  title: string;
  description?: string;
  category: PRODUCT_CATEGORIES;
  ingredients?: string[];
  price: number;
  userId: string;
  attachmentId?: string;
}

export class CreateProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    title,
    description,
    category,
    ingredients,
    price,
    userId,
    attachmentId,
  }: CreateProductRequest) {
    const product = Product.create({
      title,
      category,
      ...(description && { description }),
      ...(ingredients && { ingredients }),
      price,
      userId: new UniqueEntityId(userId),
    });

    if (attachmentId) {
      product.changeAttachment(new UniqueEntityId(attachmentId));
    }

    await this.productsRepository.create(product);

    return { product };
  }
}
