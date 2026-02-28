import { AggregateRoot } from "@/shared/entity/aggregate-root";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";
import { DomainEvent } from "./domain-event";

type DomainEventCallback<T extends DomainEvent> = (event: T) => void;

export class DomainEvents {
  private static handlersMap: Record<string, DomainEventCallback<any>[]> = {};
  private static markedAggregates: AggregateRoot<unknown>[] = [];

  public static souldRun = true;

  private static findMarkedAggregateByID(
    id: UniqueEntityId,
  ): AggregateRoot<unknown> | undefined {
    return this.markedAggregates.find((aggregate) => aggregate.id.equals(id));
  }

  public static markAggregateForDispatch(aggregate: AggregateRoot<unknown>) {
    const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id);

    if (!aggregateFound) {
      this.markedAggregates.push(aggregate);
    }
  }

  private static dispatch(event: DomainEvent) {
    const eventClassName: string = event.constructor.name;
    const isEventRegistred = eventClassName in this.handlersMap;

    if (!this.souldRun) {
      return;
    }

    if (isEventRegistred) {
      const handlers = this.handlersMap[eventClassName];
      for (const handler of handlers) {
        handler(event);
      }
    }
  }

  private static dispatchAggregateEvents(aggregate: AggregateRoot<unknown>) {
    aggregate.domainEvents.forEach((event: DomainEvent) =>
      this.dispatch(event),
    );
  }

  public static dispatchEventsForAggregate(id: UniqueEntityId) {
    const aggregate = this.findMarkedAggregateByID(id);

    if (aggregate) {
      this.dispatchAggregateEvents(aggregate);
      aggregate.clearEvents();
      this.removeAggregateFromMarkedDispatchList(aggregate);
    }
  }

  public static register<T extends DomainEvent>(
    callback: DomainEventCallback<T>,
    eventClassName: string,
  ) {
    const wasEventRegistredBefore = eventClassName in this.handlersMap;

    if (!wasEventRegistredBefore) {
      this.handlersMap[eventClassName] = [];
    }

    this.handlersMap[eventClassName].push(callback);
  }

  public static clearHandlers() {
    this.handlersMap = {};
  }

  public static cleanMarkedAggregates() {
    this.markedAggregates = [];
  }

  public static removeAggregateFromMarkedDispatchList(
    aggregate: AggregateRoot<unknown>,
  ) {
    const index = this.markedAggregates.findIndex((a) => a.equals(aggregate));
    this.markedAggregates.splice(index, 1);
  }
}
