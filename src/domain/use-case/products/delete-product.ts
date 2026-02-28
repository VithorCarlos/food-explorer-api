import { ProductDoesNotExists } from "@/domain/errors/product-does-not-exists";
import { ProductNotFoundForThisUser } from "@/domain/errors/product-not-found-for-this-user";
import { ProductsRepository } from "@/domain/repositories/products-repository";

interface DeleteProductRequest {
  id: string;
  userId: string;
}

export class DeleteProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({ id, userId }: DeleteProductRequest) {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new ProductDoesNotExists();
    }

    if (userId !== product.userId.toString()) {
      throw new ProductNotFoundForThisUser();
    }

    if (product.attachment) {
      product.removeAttachment();
    }

    await this.productsRepository.delete(product.id.toString());
  }
}
