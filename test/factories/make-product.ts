import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { faker } from "@faker-js/faker";
import { AttachmentLink } from "@/domain/entities/attachment-link";
import { PRODUCT_CATEGORIES } from "@/domain/enums/product-categories";
import { Product, ProductProps } from "@/domain/entities/product";
import { RESOURSE_TYPE } from "@/domain/enums/resource-type";

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
    const attachmentLInk = AttachmentLink.create({
      attachmentId: data.attachmentId,
      resourceId: product.id,
      resourceType: RESOURSE_TYPE.PRODUCT,
    });

    product.attachmentLink = attachmentLInk;
  }

  return product;
}
