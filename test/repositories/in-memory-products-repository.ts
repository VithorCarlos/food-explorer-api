import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { PRODUCT_CATEGORIES } from "@/domain/enums/product-categories";
import { PaginatedResponse } from "@/shared/paginated-response";
import { Product } from "@/domain/entities/product";
import {
  ProductsRepository,
  SearchManyProductsParams,
} from "@/domain/repositories/products-repository";
import { ProductWithAttachment } from "@/domain/entities/value-objects/product-with-attachment";
import { InMemoryProductAttachmentRepository } from "./in-memory-product-attachment-repository";
import { DomainEvents } from "@/domain/events/domain-events";
import { InMemoryAttachmentRepository } from "./in-memory-attachment-repository";

export class InMemoryProductsRepository implements ProductsRepository {
  constructor(
    private productAttachmentRepository: InMemoryProductAttachmentRepository,
  ) {}
  public items: Product[] = [];
  public productsWithAttachments: ProductWithAttachment[] = [];

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
  }: SearchManyProductsParams): Promise<PaginatedResponse<Product>> {
    if (!title && (!ingredients || ingredients.length === 0)) {
      const filteredItems = this.items.slice(
        (page - 1) * perPage,
        page * perPage,
      );
      const itemsIds = new Set(filteredItems.map((item) => item.id));
      const total = itemsIds.size;
      const hasMore = page * perPage < total;

      return {
        data: filteredItems,
        pagination: {
          total,
          hasMore,
          nextPage: hasMore ? page + 1 : null,
        },
      };
    }

    const filteredItems = this.items
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

    const itemsIds = new Set(filteredItems.map((item) => item.id));
    const total = itemsIds.size;
    const hasMore = page * perPage < total;

    return {
      data: filteredItems,
      pagination: {
        total,
        hasMore,
        nextPage: hasMore ? page + 1 : null,
      },
    };
  }

  async findActiveCategories(): Promise<PRODUCT_CATEGORIES[]> {
    const allCategories = this.items.map((item) => item.category);

    const activeCategories = [...new Set(allCategories)];

    return activeCategories;
  }

  async findByIdWithAttachment(
    id: string,
  ): Promise<ProductWithAttachment | null> {
    const product = this.items.find((item) => item.id.toString() === id);

    if (!product) {
      return null;
    }

    return ProductWithAttachment.create({
      title: product.title,
      price: product.price,
      category: product.category,
      createdAt: product.createdAt,
      ...(product.description && { description: product.description }),
      ...(product.attachment?.id && {
        attachmentId: product.attachment.id,
        attachmentUrl: product.attachment.attachmentId + ".png",
      }),
      ingredients: product.ingredients,
      productId: product.id,
      userId: product.userId,
    });
  }

  async searchManyWithAttachments({
    page,
    perPage,
    category,
    title,
    ingredients,
  }: SearchManyProductsParams) {
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

    const filteredItems = filtered.map((product) =>
      ProductWithAttachment.create({
        title: product.title,
        price: product.price,
        category: product.category,
        createdAt: product.createdAt,
        attachmentId: product.attachment?.id,
        attachmentUrl: product.attachment?.attachmentId + ".png",
        description: product.description,
        ingredients: product.ingredients,
        productId: product.id,
        userId: product.userId,
      }),
    );
    const itemsIds = new Set(filteredItems.map((item) => item.productId));
    const total = itemsIds.size;
    const hasMore = page * perPage < total;

    return {
      data: filteredItems,
      pagination: {
        total,
        hasMore,
        nextPage: hasMore ? page + 1 : null,
      },
    };
  }

  async create(data: Product) {
    this.items.push(data);

    if (data.attachment) {
      await this.productAttachmentRepository.create(data.attachment);
    }
  }

  async update(data: Product) {
    const itemIndex = this.items.findIndex((item) => item.id === data.id);

    const linkIndex = this.productAttachmentRepository.items.findIndex((item) =>
      item.productId.equals(data.id),
    );

    if (linkIndex >= 0) {
      DomainEvents.dispatchEventsForAggregate(data.id);
      this.productAttachmentRepository.items.splice(linkIndex, 1);
    }

    if (data.attachment) {
      this.productAttachmentRepository.create(data.attachment);
    }

    this.items[itemIndex] = data;
  }

  async delete(id: string) {
    const itemIndex = this.items.findIndex((item) => item.id.toString() === id);

    if (itemIndex === -1) return;

    const productAttachmentIndex =
      this.productAttachmentRepository.items.findIndex((item) =>
        item.productId.equals(new UniqueEntityId(id)),
      );

    this.items.splice(itemIndex, 1);

    if (productAttachmentIndex >= 0) {
      this.productAttachmentRepository.items.splice(productAttachmentIndex, 1);
    }

    DomainEvents.dispatchEventsForAggregate(new UniqueEntityId(id));
  }
}
