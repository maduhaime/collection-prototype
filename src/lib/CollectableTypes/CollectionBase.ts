import { isValidDate, isValidNumber } from '@/lib/RunType/Casting';
import { TypeEnum, TypeOf } from '@/lib/RunType/TypeOf';
import {
  BooleanCompare,
  booleanFilter,
  DateCompare,
  dateFilter,
  NumberCompare,
  numberFilter,
  StringCompare,
  stringFilter,
} from './CollectionFilters';
import { fieldGuard, typeofGuard, undefinedGuard } from './CollectionGuards';
import { argsRegExp, chainSplitter, fnRegExp, SupportedArgs } from './CollectionScope';
import { SortDirEnum, sortByDateField, sortByNumberField, sortByStringField, SortDirection, SortType, SortTypeEnum } from './CollectionSort';

export class CollectionBase<T extends object> {
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

  protected boolean_equals<K extends keyof ByType<T, Boolean>>(field: K, target: Boolean): this {
    this._collection = booleanFilter(this._collection, field, BooleanCompare.EQUALS, target);
    return this;
  }

  protected number_equals<K extends keyof ByType<T, number>>(field: K, target: number): this {
    this._collection = numberFilter(this._collection, field, NumberCompare.EQUALS, target);
    return this;
  }

  protected string_equals<K extends keyof ByType<T, string>>(field: K, target: string): this {
    this._collection = stringFilter(this._collection, field, StringCompare.EQUALS, target);
    return this;
  }

  protected string_includes<K extends keyof ByType<T, string>>(field: K, target: string): this {
    this._collection = stringFilter(this._collection, field, StringCompare.INCLUDES, target);
    return this;
  }

  protected date_equals<K extends keyof ByType<T, Date>>(field: K, target: Date): this {
    this._collection = dateFilter(this._collection, field, DateCompare.EQUALS, target);
    return this;
  }

  protected between_dates<K extends keyof ByType<T, Date>>(field: K, start: Date, end: Date): this {
    this._collection = this._collection.filter((item: T) => {
      const date = item[field] as Date;
      return date.getTime() > start.getTime() && date.getTime() < end.getTime();
    });
    return this;
  }

  field_equals<K extends keyof T>(field: K, target: T[K]): this {
    // TODO: Add a runtime error if field (K) not present in Object (T)... Edge Case birthday/date...

    if (TypeOf(target).is(TypeEnum.STRING)) {
      const f = field as keyof ByType<T, string>;
      const t = target as string;
      return this.string_equals(f, t);
    }

    if (TypeOf(target).is(TypeEnum.NUMBER)) {
      const f = field as keyof ByType<T, number>;
      const t = target as number;
      return this.number_equals(f, t);
    }

    if (TypeOf(target).is(TypeEnum.BOOLEAN)) {
      const f = field as keyof ByType<T, Boolean>;
      const t = target as Boolean;
      return this.boolean_equals(f, t);
    }

    if (TypeOf(target).is(TypeEnum.DATE)) {
      const f = field as keyof ByType<T, Date>;
      const t = target as Date;
      return this.date_equals(f, t);
    }

    throw new Error('Field type is not supported by "field_equals".  Only String, Number, Boolean and Date');
  }

  protected is_truthy<K extends keyof ByType<T, Boolean>>(field: K): this {
    this._collection = booleanFilter(this._collection, field, BooleanCompare.EQUALS, true);
    return this;
  }

  protected is_falsy<K extends keyof ByType<T, Boolean>>(field: K): this {
    this._collection = booleanFilter(this._collection, field, BooleanCompare.EQUALS, false);
    return this;
  }

  protected is_null<K extends keyof Nullable<T>>(field: K): this {
    this._collection = this._collection.filter((item: T) => {
      return item[field] === null;
    });
    return this;
  }

  protected is_undefined<K extends keyof Optional<T>>(field: K): this {
    this._collection = this._collection.filter((item: T) => {
      return item[field] ? false : true;
    });
    return this;
  }

  sort<K extends keyof T>(field: K, dir: SortDirection = SortDirEnum.ASC, type: SortType = SortTypeEnum.STRING): this {
    // Runtime Guards
    fieldGuard(this._collection, field);
    undefinedGuard(this._collection, field);
    typeofGuard(this._collection, field, type);

    switch (type) {
      case SortTypeEnum.NUMBER:
        this._collection = sortByNumberField(this._collection, field, dir);
        break;
      case SortTypeEnum.DATE:
        this._collection = sortByDateField(this._collection, field, dir);
        break;
      case SortTypeEnum.STRING:
        this._collection = sortByStringField(this._collection, field, dir);
        break;
      default:
        throw new Error(`${type} is not a valid sort type`);
    }
    return this;
  }

  reset(): void {
    this._collection = this._unscopped;
  }

  scope(chain: string): this {
    console.log('chain :', chain);
    const links: string[] = chain.split(chainSplitter).map((str: string) => str.trim());

    links.forEach((link) => {
      const fnCall = fnRegExp.exec(link);
      const fnName = fnCall?.groups?.fnName || link;
      const fnArgs = fnCall?.groups?.fnArgs || undefined;

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

        fn.apply(this, castedArgs);
      }
    });
    return this;
  }
}
