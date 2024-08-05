export enum DirEnum {
  ASC = 'asc',
  DESC = 'desc',
}

export type SortDirection = `${DirEnum}`;

export enum TypeEnum {
  STRING = 'string',
  NUMBER = 'number',
  DATE = 'date',
}

export type SortType = `${TypeEnum}`;

export function sortByStringField<T, K extends keyof T>(collection: T[], field: K, dir: SortDirection = DirEnum.ASC) {
  return collection.sort((itemA: T, itemB: T) => {
    const a = String(itemA[field]);
    const b = String(itemB[field]);

    if (dir === DirEnum.ASC) return a.localeCompare(b);
    if (dir === DirEnum.DESC) return b.localeCompare(a);
    return 0;
  });
}

export function sortByNumberField<T, K extends keyof T>(collection: T[], field: K, dir: SortDirection = DirEnum.ASC) {
  return collection.sort((itemA: T, itemB: T) => {
    const a = Number(itemA[field]);
    const b = Number(itemB[field]);

    if (dir === DirEnum.ASC) return a - b;
    if (dir === DirEnum.DESC) return b - a;
    return 0;
  });
}

export function sortByDateField<T, K extends keyof T>(collection: T[], field: K, dir: SortDirection = DirEnum.ASC) {
  return collection.sort((itemA: T, itemB: T) => {
    const a = itemA[field] as Date;
    const b = itemB[field] as Date;

    if (dir === DirEnum.ASC) return a.getTime() - b.getTime();
    if (dir === DirEnum.DESC) return b.getTime() - a.getTime();
    return 0;
  });
}
