export enum SortDirEnum {
  ASC = 'asc',
  DESC = 'desc',
}

export type SortDirection = `${SortDirEnum}`;

export enum SortTypeEnum {
  STRING = 'string',
  NUMBER = 'number',
  DATE = 'date',
}

export type SortType = `${SortTypeEnum}`;

// export type SortParams = {
//   dir: SortDirection;
//   allowNull: Boolean;
// };

export function hasNull(a: unknown, b: unknown) {
  return a === null || b === null;
}

export function compareNull(a: unknown, b: unknown, dir: SortDirection): number {
  if (a !== null && b !== null) throw new Error(`At least a or b must be null`);

  const valueA: number = a === null ? 0 : 1;
  const valueB: number = b === null ? 0 : 1;

  if (dir === SortDirEnum.ASC) return valueA - valueB;
  if (dir === SortDirEnum.DESC) return valueB - valueA;
  return 0;
}

export function sortByStringField<T, K extends keyof T>(collection: T[], field: K, dir: SortDirection = SortDirEnum.ASC): T[] {
  return collection.sort((itemA: T, itemB: T) => {
    if (hasNull(itemA[field], itemB[field])) return compareNull(itemA[field], itemB[field], dir);

    const a = String(itemA[field]);
    const b = String(itemB[field]);

    if (dir === SortDirEnum.ASC) return a.localeCompare(b);
    if (dir === SortDirEnum.DESC) return b.localeCompare(a);
    return 0;
  });
}

export function sortByNumberField<T, K extends keyof T>(collection: T[], field: K, dir: SortDirection = SortDirEnum.ASC): T[] {
  return collection.sort((itemA: T, itemB: T) => {
    if (hasNull(itemA[field], itemB[field])) return compareNull(itemA[field], itemB[field], dir);

    const a = Number(itemA[field]);
    const b = Number(itemB[field]);

    if (dir === SortDirEnum.ASC) return a - b;
    if (dir === SortDirEnum.DESC) return b - a;
    return 0;
  });
}

export function sortByDateField<T, K extends keyof T>(collection: T[], field: K, dir: SortDirection = SortDirEnum.ASC): T[] {
  return collection.sort((itemA: T, itemB: T) => {
    if (hasNull(itemA[field], itemB[field])) return compareNull(itemA[field], itemB[field], dir);

    const a = itemA[field] as Date;
    const b = itemB[field] as Date;

    if (dir === SortDirEnum.ASC) return a.getTime() - b.getTime();
    if (dir === SortDirEnum.DESC) return b.getTime() - a.getTime();
    return 0;
  });
}
