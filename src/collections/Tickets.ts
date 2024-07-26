import { CollectionBase } from '../lib/collection/CollectionBase';
import type { Ticket, TicketType } from '../models/Ticket';

interface TicketScope {
  all: () => this;
  by_name: (type: string) => this;
  by_type: (type: TicketType) => this;
  between_dates: (start: Date, end: Date) => this;
}

export class TicketCollection extends CollectionBase<Ticket> implements TicketScope {
  constructor(items: Ticket[]) {
    super(items);
  }

  all(): this {
    console.log('all');

    return this;
  }

  by_type(type: TicketType): this {
    console.log('by_type :', type);

    return this.field_equals('type', type);
  }

  by_name(name: string): this {
    console.log('by_name :', name);

    return this.field_equals('name', name);
  }

  between_dates(start: Date, end: Date) {
    console.log('between', start, end);

    this._collection = this._collection.filter((item: Ticket) => {
      return start < item.date && item.date < end;
    });
    return this;
  }
}
