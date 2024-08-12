import { KnownType, TypeOf } from '@/lib/RunType/TypeOf';

/* Throws an error (at runtime) if a given field is not present on every items of a collection */
export function fieldGuard<T extends object>(collection: T[], field: keyof T): void {
  const everywhere: boolean = collection.every((item: T) => field in item);
  if (!everywhere) throw new Error(`${String(field)} field is not present on every items of the collection.`);
}

/* Throws an error (at runtime) if a given field as a value to null or undefined in an item of a collection. */
export function undefinedGuard<T extends object>(collection: T[], field: keyof T): void {
  const everywhere: boolean = collection.every((item: T) => item[field] !== null && item[field] !== undefined);
  if (!everywhere) throw new Error(`A less one item has ${String(field)} value undefined.`);
}

/* Throws an error (at runtime) if a given field as a value to null or undefined in an item of a collection. */
export function nullGuard<T extends object>(collection: T[], field: keyof T): void {
  const everywhere: boolean = collection.every((item: T) => item[field] !== null && item[field] !== undefined);
  if (!everywhere) throw new Error(`A less one item has ${String(field)} value to null.`);
}

/* Throws an error (at runtime) if a given field as the wrong type in any item of a collection. */
export function typeofGuard<T extends object>(collection: T[], field: keyof T, type: KnownType): void {
  const everywhere: boolean = collection.every((item: T) => {
    return TypeOf(item[field]).is(type);
  });
  if (!everywhere) throw new Error(`A less one item as a wrong type for field: ${String(field)}.`);
}
