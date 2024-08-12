import { CollectionBase } from '@/lib/CollectableTypes/CollectionBase';
import type { Ticket, TicketType } from '@/demo/models/Ticket';

export class TicketCollection extends CollectionBase<Ticket> implements DynamicScope {
  [index: string]: unknown;

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

  occurs_between(start: Date, end: Date) {
    // console.log('occurs_between :', start, end);
    return this.between_dates('date', start, end);
  }

  without_department(): this {
    // console.log('without_department');
    return this.is_null('department');
  }

  without_company(): this {
    // console.log('without_company');

    return this.is_undefined('company');
  }
}
