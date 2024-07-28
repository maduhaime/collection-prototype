import { SuperType, superType } from '../types/SuperType';

/* Throws an error (at runtime) if a given field is not present on every items of a collection */
export function everyFieldPresentGuard<T extends object>(collection: T[], field: keyof T): void {
  const everywhere: boolean = collection.every((item: T) => field in item);
  if (!everywhere) throw new Error(`${String(field)} is not present on every items.`);
}

/* Throws an error (at runtime) if a given field as a value to null or undefined in an item of a collection. */
export function everyFieldDefinedGuard<T extends object>(collection: T[], field: keyof T): void {
  const everywhere: boolean = collection.every((item: T) => item[field] !== null && item[field] !== undefined);
  if (!everywhere) throw new Error(`A less one item as ${String(field)} set to null or undefined.`);
}

/* Throws an error (at runtime) if a given field as the wrong type in any item of a collection. */
export function everyFieldTypeOfGuard<T extends object>(collection: T[], field: keyof T, type: SuperType): void {
  const everywhere: boolean = collection.every((item: T) => {
    return superType(item[field]) === type;
  });
  if (!everywhere) throw new Error(`A less one item as a wrong type for field: ${String(field)}.`);
}
