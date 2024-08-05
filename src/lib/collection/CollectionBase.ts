import { argsRegExp, chainSplitter, fnRegExp, SupportedArgs } from './CollectionScope';
import { everyFieldDefinedGuard, everyFieldPresentGuard, everyFieldTypeOfGuard } from './CollectionGuards';
import { DirEnum, SortDirection, SortType, sortByDateField, sortByNumberField, sortByStringField } from './CollectionSort';
import { isValidDate, isValidNumber } from '../Casting';

export interface CollectionScope<T> {
  items: T[];
  count: number;
  field_equals: (field: keyof T, value: T[keyof T]) => this;
  sort: (field: keyof T, dir: SortDirection, type: SortType) => this;
  reset: () => void;
}

// Collection Abstraction
export class CollectionBase<T extends object> implements CollectionScope<T> {
  [index: string]: unknown;

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

  private number_equals<K extends keyof T>(field: K, value: Number): this {
    this._collection = this._collection.filter((item: T) => {
      return item[field] === value;
    });
    return this;
  }

  private string_equals<K extends keyof T>(field: K, value: String): this {
    this._collection = this._collection.filter((item: T) => {
      const target = value.trim();
      return item[field] === target;
    });
    return this;
  }

  private date_equals<K extends keyof T>(field: K, value: Date): this {
    console.log(value);
    this._collection = this._collection.filter((item: T) => {
      console.log('field: ', field);
      const date = item[field] as Date;
      return date.getTime() === value.getTime();
    });
    return this;
  }

  field_equals<K extends keyof T>(field: K, value: T[K]): this {
    // TODO: Add a runtime error if field (K) not present in Object (T)... Edge Case birthday/date...

    // TODO: Upgrade with SuperType
    if (typeof value === 'string') return this.string_equals(field, value);
    if (typeof value === 'number') return this.number_equals(field, value);
    if (value instanceof Date) return this.date_equals(field, value as Date);

    throw new Error('Field type is not supported.  Only String, Number and Date');
  }

  sort(field: keyof T, dir: SortDirection = DirEnum.ASC, type: SortType = 'string'): this {
    // Runtime Guards
    everyFieldPresentGuard(this._collection, field);
    everyFieldDefinedGuard(this._collection, field);
    everyFieldTypeOfGuard(this._collection, field, type);

    // TODO: Replace type argument by runtime analyse of item[field].
    switch (type) {
      case 'number':
        this._collection = sortByNumberField(this._collection, field, dir);
        break;
      case 'date':
        this._collection = sortByDateField(this._collection, field, dir);
        break;
      default:
        this._collection = sortByStringField(this._collection, field, dir);
    }
    return this;
  }

  reset(): void {
    this._collection = this._unscopped;
  }

  scope(chain: string): this {
    const links: string[] = chain.split(chainSplitter).map((str: string) => str.trim());

    links.forEach((link) => {
      const fnCall = fnRegExp.exec(link);
      const fnName = fnCall?.groups?.fnName || link;
      const fnArgs = fnCall?.groups?.fnArgs || undefined;

      // console.log(fnName, fnArgs);
      // console.log(typeof this[fnName]);

      // Throws Error if the chain link is not a function
      if (typeof this[fnName as keyof this] !== 'function') throw new Error(`Function ${fnName} in chain is invalid`);

      const fn = this[fnName] as Function;

      if (!fnArgs) {
        fn();
      } else {
        let strArgs: string[] | null = fnArgs.match(argsRegExp);
        let castedArgs: SupportedArgs = [];

        if (strArgs) {
          castedArgs = strArgs.map((str) => {
            const value = str.trim();

            if (isValidNumber(value)) return Number(value);
            if (isValidDate(value)) return new Date(value);
            return value;
          });
        }

        // castedArgs.forEach((arg) => console.log(`${arg} is typeof ${typeof arg}`));

        fn.apply(this, castedArgs);
      }
    });
    return this;
  }
}
