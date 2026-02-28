import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { faker } from "@faker-js/faker";
import { PRODUCT_CATEGORIES } from "@/domain/enums/product-categories";
import { Product, ProductProps } from "@/domain/entities/product";
import { RESOURSE_TYPE } from "@/domain/enums/resource-type";
import { PrismaProductAdapter } from "@/infra/database/adapters/prisma-product-adapter";
import { PrismaService } from "@/infra/database/prisma";

export function makeProduct(
  data: Partial<
    ProductProps & { id?: UniqueEntityId; attachmentId?: UniqueEntityId }
  > = {},
  userId?: UniqueEntityId,
) {
  const { id, attachmentId, ...rest } = data;

  const product = Product.create(
    {
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: Number(faker.commerce.price()),
      category: faker.helpers.arrayElement(Object.values(PRODUCT_CATEGORIES)),
      ingredients: faker.helpers.multiple(faker.commerce.product, { count: 3 }),
      userId: userId ?? new UniqueEntityId(),
      ...rest,
    },
    id,
  );

  if (data.attachmentId) {
    product.changeAttachment(data.attachmentId);
  }

  return product;
}

export class ProductFactory {
  constructor(private prisma: PrismaService) {}

  async makeProductToPrisma(
    data: Partial<
      ProductProps & { id?: UniqueEntityId; attachmentId?: UniqueEntityId }
    > = {},
  ): Promise<Product> {
    const product = makeProduct(data);

    await this.prisma.product.create({
      data: PrismaProductAdapter.toPrisma(product),
    });

    return product;
  }
}
