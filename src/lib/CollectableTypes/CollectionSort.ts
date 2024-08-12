import { TypeEnum } from '../RunType/TypeOf';

export enum SortDirEnum {
  ASC = 'asc',
  DESC = 'desc',
}

export type SortDirection = `${SortDirEnum}`;

export enum SortTypeEnum {
  STRING = TypeEnum.STRING,
  NUMBER = TypeEnum.NUMBER,
  DATE = TypeEnum.DATE,
}

export type SortType = `${SortTypeEnum}`;

// TODO: What if there is an null and an undefined at the same time...
// TODO: Need a boolean sort...

export function hasUndefined(a: unknown, b: unknown) {
  return a === undefined || b === undefined;
}

export function sortUndefined(a: unknown, b: unknown, dir: SortDirection): number {
  if (a !== undefined && b !== undefined) throw new Error(`At least ${a} or ${b} must be undefined`);

  if (a === undefined && b === undefined) return 0;
  if (dir === SortDirEnum.ASC) return a === undefined ? -1 : 1;
  if (dir === SortDirEnum.DESC) return a === undefined ? 1 : -1;

  // Not covered is test
  return 0;
}

export function hasNull(a: unknown, b: unknown) {
  return a === null || b === null;
}

export function sortNull(a: unknown, b: unknown, dir: SortDirection): number {
  if (a !== null && b !== null) throw new Error(`At least ${a} or ${b} must be null`);

  if (a === null && b === null) return 0;
  if (dir === SortDirEnum.ASC) return a === null ? -1 : 1;
  if (dir === SortDirEnum.DESC) return a === null ? 1 : -1;

  // Not covered is test
  return 0;
}

export function sortByStringField<T, K extends keyof T>(collection: T[], field: K, dir: SortDirection = SortDirEnum.ASC): T[] {
  return collection.sort((itemA: T, itemB: T) => {
    if (hasUndefined(itemA[field], itemB[field])) return sortUndefined(itemA[field], itemB[field], dir);
    if (hasNull(itemA[field], itemB[field])) return sortNull(itemA[field], itemB[field], dir);

    const a = String(itemA[field]);
    const b = String(itemB[field]);

    if (dir === SortDirEnum.ASC) return a.localeCompare(b);
    if (dir === SortDirEnum.DESC) return b.localeCompare(a);

    // Not covered is test
    return 0;
  });
}

export function sortByNumberField<T, K extends keyof T>(collection: T[], field: K, dir: SortDirection = SortDirEnum.ASC): T[] {
  return collection.sort((itemA: T, itemB: T) => {
    if (hasUndefined(itemA[field], itemB[field])) return sortUndefined(itemA[field], itemB[field], dir);
    if (hasNull(itemA[field], itemB[field])) return sortNull(itemA[field], itemB[field], dir);

    const a = Number(itemA[field]);
    const b = Number(itemB[field]);

    if (dir === SortDirEnum.ASC) return a - b;
    if (dir === SortDirEnum.DESC) return b - a;

    // Not covered is test
    return 0;
  });
}

export function sortByDateField<T, K extends keyof T>(collection: T[], field: K, dir: SortDirection = SortDirEnum.ASC): T[] {
  return collection.sort((itemA: T, itemB: T) => {
    if (hasUndefined(itemA[field], itemB[field])) return sortUndefined(itemA[field], itemB[field], dir);
    if (hasNull(itemA[field], itemB[field])) return sortNull(itemA[field], itemB[field], dir);

    const a = itemA[field] as Date;
    const b = itemB[field] as Date;

    if (dir === SortDirEnum.ASC) return a.getTime() - b.getTime();
    if (dir === SortDirEnum.DESC) return b.getTime() - a.getTime();

    // Not covered is test
    return 0;
  });
}
