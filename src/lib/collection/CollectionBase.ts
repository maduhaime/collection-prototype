import { everyFieldDefinedGuard, everyFieldPresentGuard, everyFieldTypeOfGuard } from './CollectionGuards';
import { SortDirection, SortType, sortByDateField, sortByNumberField, sortByStringField } from './CollectionSort';

export interface CollectionScope<T> {
  items: T[];
  count: number;
  field_equals: (field: keyof T, value: T[keyof T]) => this;
  sort: (field: keyof T, direction: SortDirection, type: SortType) => this;
  reset: () => void;
}

// Collection Abstraction
export class CollectionBase<T extends object> implements CollectionScope<T> {
  // Stores the original copy of given items
  protected _unscopped: T[];

  // Collection affected by scopes (filtering) and sorts
  protected _collection: T[];

  constructor(items: T[]) {
    this._unscopped = items || [];
    this._collection = items || [];
  }

  get items(): T[] {
    return this._collection;
  }

  get count(): number {
    return this._collection.length;
  }

  field_equals<K extends keyof T>(field: K, value: T[K]): this {
    this._collection = this._collection.filter((item: T) => {
      return item[field] === value;
    });

    return this;
  }

  sort(field: keyof T, direction: SortDirection = 'asc', type: SortType = 'string'): this {
    // Runtime Guards
    everyFieldPresentGuard(this._collection, field);
    everyFieldDefinedGuard(this._collection, field);
    everyFieldTypeOfGuard(this._collection, field, type);

    switch (type) {
      case 'number':
        this._collection = sortByNumberField(this._collection, field, direction);
        break;
      case 'date':
        this._collection = sortByDateField(this._collection, field, direction);
        break;
      default:
        this._collection = sortByStringField(this._collection, field, direction);
    }
    return this;
  }

  reset(): void {
    this._collection = this._unscopped;
  }
}
