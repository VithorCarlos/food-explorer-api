import { DomainEvent } from "@/domain/events/domain-event";
import { BaseEntity } from "./base-identity";
import { DomainEvents } from "@/domain/events/domain-events";

export abstract class AggregateRoot<Props> extends BaseEntity<Props> {
  private _domainEvents: DomainEvent[] = [];

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  protected addDomainEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
    DomainEvents.markAggregateForDispatch(this);
  }

  public clearEvents() {
    this._domainEvents = [];
  }
}
