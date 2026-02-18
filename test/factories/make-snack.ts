import { Snack, SnackProps } from "@/domain/entities/snack";
import { FOOD_CATEGORIES } from "@/domain/enums/food-categories";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { faker } from "@faker-js/faker";
import { AttachmentLink } from "@/domain/entities/attachment-link";

export function makeSnack(
  data: Partial<
    SnackProps & { id?: UniqueEntityId; attachmentId: UniqueEntityId }
  > = {},
  userId: UniqueEntityId,
) {
  const { id, attachmentId, ...rest } = data;

  const snack = Snack.create(
    {
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: Number(faker.commerce.price()),
      category: faker.helpers.arrayElement(Object.values(FOOD_CATEGORIES)),
      ingredients: faker.helpers.multiple(faker.commerce.product, { count: 3 }),
      userId,
      ...rest,
    },
    id,
  );

  if (data.attachmentId) {
    const attachmentLInk = AttachmentLink.create({
      attachmentId: data.attachmentId,
      resourceId: snack.id,
      resourceType: "SNACK",
    });

    snack.attachmentLink = attachmentLInk;
  }

  return snack;
}
