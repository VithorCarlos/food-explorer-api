import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { DomainEvent } from "./domain-event";

export class ProductAttachmentChangedEvent implements DomainEvent {
  public ocurredAt: Date;

  constructor(public readonly productId: UniqueEntityId) {
    console.log({ productId });
    this.ocurredAt = new Date();
  }

  getAggregateId(): UniqueEntityId {
    return this.productId;
  }
}
