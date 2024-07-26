export type SortDirection = 'asc' | 'desc';

export type SortType = 'string' | 'number' | 'date';

export function sortByStringField<T, K extends keyof T>(collection: T[], field: K, direction: SortDirection = 'asc') {
  return collection.sort((itemA: T, itemB: T) => {
    const a = String(itemA[field]);
    const b = String(itemB[field]);

    if (direction === 'asc') return a.localeCompare(b);
    if (direction === 'desc') return b.localeCompare(a);
    return 0;
  });
}

export function sortByNumberField<T, K extends keyof T>(collection: T[], field: K, direction: SortDirection = 'asc') {
  return collection.sort((itemA: T, itemB: T) => {
    const a = Number(itemA[field]);
    const b = Number(itemB[field]);

    if (direction === 'asc') return a - b;
    if (direction === 'desc') return b - a;
    return 0;
  });
}

export function sortByDateField<T, K extends keyof T>(collection: T[], field: K, direction: SortDirection = 'asc') {
  return collection.sort((itemA: T, itemB: T) => {
    const a = itemA[field] as Date;
    const b = itemB[field] as Date;

    if (direction === 'asc') return a.getTime() - b.getTime();
    if (direction === 'desc') return b.getTime() - a.getTime();
    return 0;
  });
}
