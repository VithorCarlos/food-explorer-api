import { Snack } from "@/domain/entities/snack";
import { SnackWithAttachment } from "@/domain/entities/value-objects/snack-with-attachment";
import {
  SearchManySnacksParams,
  SnacksRepository,
} from "@/domain/repositories/snacks-repository";
import { InMemoryAttachmentLinkRepository } from "./in-memory-attachment-link-repository";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";

export class InMemorySnacksRepository implements SnacksRepository {
  constructor(
    private inMemoryAttachmentLinkRepository: InMemoryAttachmentLinkRepository,
  ) {}
  public items: Snack[] = [];
  public snacksWithAttachments: SnackWithAttachment[] = [];

  async findById(id: string) {
    const item = this.items.find((item) => item.id.toString() === id);

    if (!item) {
      return null;
    }

    return item;
  }

  async searchMany({
    page,
    perPage,
    category,
    title,
    ingredients,
  }: SearchManySnacksParams) {
    if (!title && (!ingredients || ingredients.length === 0)) {
      return this.items.slice((page - 1) * perPage, page * perPage);
    }

    return this.items
      .filter((item) => {
        if (category && item.category !== category) {
          return false;
        }

        if (title && !item.title.includes(title)) {
          return false;
        }

        if (
          ingredients &&
          !ingredients.every((query) =>
            item.ingredients.some((ingredient) => ingredient.includes(query)),
          )
        ) {
          return false;
        }

        return true;
      })
      .slice((page - 1) * perPage, page * perPage);
  }

  async findByIdWithAttachment(
    id: string,
  ): Promise<SnackWithAttachment | null> {
    const snack = this.items.find((item) => item.id.toString() === id);

    if (!snack) {
      return null;
    }

    return SnackWithAttachment.create({
      title: snack.title,
      price: snack.price,
      category: snack.category,
      createdAt: snack.createdAt,
      attachmentUrl: snack.attachmentLink.attachmentId + ".png",
      description: snack.description,
      ingredients: snack.ingredients,
      snackId: snack.id,
      userId: snack.userId,
    });
  }

  async searchManyWithAttachments({
    page,
    perPage,
    category,
    title,
    ingredients,
  }: SearchManySnacksParams): Promise<SnackWithAttachment[]> {
    const filtered = this.items
      .filter((item) => {
        if (category && item.category !== category) return false;

        if (title && !item.title.includes(title)) return false;

        if (
          ingredients &&
          !ingredients.every((q) =>
            item.ingredients.some((ingredient) => ingredient.includes(q)),
          )
        )
          return false;

        return true;
      })
      .slice((page - 1) * perPage, page * perPage);

    return filtered.map((snack) =>
      SnackWithAttachment.create({
        title: snack.title,
        price: snack.price,
        category: snack.category,
        createdAt: snack.createdAt,
        attachmentUrl: snack.attachmentLink.attachmentId + ".png",
        description: snack.description,
        ingredients: snack.ingredients,
        snackId: snack.id,
        userId: snack.userId,
      }),
    );
  }

  async create(data: Snack) {
    this.items.push(data);
    await this.inMemoryAttachmentLinkRepository.createLink(data.attachmentLink);
  }

  async update(data: Snack) {
    const itemIndex = this.items.findIndex((item) => item.id === data.id);

    const linkIndex = this.inMemoryAttachmentLinkRepository.items.findIndex(
      (item) => item.resourceId.equals(data.id),
    );

    if (linkIndex >= 0) {
      this.inMemoryAttachmentLinkRepository.items.splice(linkIndex, 1);
    }

    if (data.attachmentLink) {
      this.inMemoryAttachmentLinkRepository.createLink(data.attachmentLink);
    }

    this.items[itemIndex] = data;
  }

  async delete(id: string) {
    const itemIndex = this.items.findIndex((item) => item.id.toString() === id);

    const linkIndex = this.inMemoryAttachmentLinkRepository.items.findIndex(
      (item) => item.resourceId.equals(new UniqueEntityId(id)),
    );

    if (itemIndex >= 0) {
      this.items.splice(itemIndex, 1);
    }

    if (linkIndex >= 0) {
      this.inMemoryAttachmentLinkRepository.items.splice(linkIndex, 1);
    }
  }
}
