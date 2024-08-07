import { CollectionBase } from '../lib/collection/CollectionBase';
import type { Ticket, TicketType } from '../models/Ticket';

export class TicketCollection extends CollectionBase<Ticket> {
  constructor(items: Ticket[]) {
    super(items);
  }

  all(): this {
    // console.log('all');
    return this;
  }

  prioritary(): this {
    // console.log('prioritary');
    return this.is_truthy('prioritary');
  }

  by_type(type: TicketType): this {
    // console.log('by_type :', type);
    return this.string_equals('type', type);
  }

  by_name(name: string): this {
    // console.log('by_name :', name);
    return this.string_equals('name', name);
  }

  // occur_between(start: Date, end: Date) {
  //   // console.log('between', start, end);
  //   this._collection = this._collection.filter((item: Ticket) => {
  //     return start < item.date && item.date < end;
  //   });
  //   return this;
  // }

  occurs_between(start: Date, end: Date) {
    // console.log('occur_between :', start, end);
    return this.between_dates('date', start, end);
  }

  without_department(): this {
    return this.is_null('department');
  }

  without_business(): this {
    return this.is_undefined('company');
  }
}
