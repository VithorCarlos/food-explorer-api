import { UniqueEntityId } from "@/shared/entity/unique-entity-id";

export interface DomainEvent {
  ocurredAt: Date;
  getAggregateId(): UniqueEntityId;
}
