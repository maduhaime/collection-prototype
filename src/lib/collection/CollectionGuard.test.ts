// sum.test.js
import { describe, expect, test } from 'vitest';

import { everyFieldPresentGuard, everyFieldDefinedGuard, everyFieldTypeOfGuard } from './CollectionGuards';

// Type for name is volontary sets to number, null and undefined, to avoid type error during test.
type DummyType = {
  id: number;
  name?: string | number | null | undefined;
  age?: number;
  birthday?: Date;
};

describe('CollectionGuard / everyFieldPresentGuard', () => {
  test('Throws an error if a given field in not present in every items on an Array', () => {
    const dummyItems: DummyType[] = [{ id: 1, name: 'Anthony' }, { id: 2 }];

    expect(() => everyFieldPresentGuard(dummyItems, 'name')).toThrowError();
  });
});

describe('CollectionGuard / everyFieldDefinedGuard', () => {
  test('Throws an error if a given field is undefined at lease in one item of an Array', () => {
    const dummyItems: DummyType[] = [
      { id: 1, name: 'Anthony' },
      { id: 2, name: undefined },
    ];

    expect(() => everyFieldDefinedGuard(dummyItems, 'name')).toThrowError();
  });

  test('Throws an error if a given field is null at lease in one item of an Array', () => {
    const dummyItems: DummyType[] = [
      { id: 1, name: 'Anthony' },
      { id: 2, name: null },
    ];

    expect(() => everyFieldDefinedGuard(dummyItems, 'name')).toThrowError();
  });
});

describe('CollectionGuard / everyFieldTypeOfGuard', () => {
  test('Throws an error if a given field is not of a given type in all items of an Array', () => {
    const dummyItems: DummyType[] = [
      { id: 1, name: 'Anthony' },
      { id: 2, name: 2 },
    ];

    expect(() => everyFieldTypeOfGuard(dummyItems, 'name', 'string')).toThrowError();
  });

  test('Throws...', () => {
    const dummyItems: DummyType[] = [
      { id: 1, name: 'Anthony', age: 20, birthday: new Date('2005-01-01') },
      { id: 2, name: 'Zachary', age: 30, birthday: new Date('1995-01-01') },
    ];

    expect(() => everyFieldTypeOfGuard(dummyItems, 'birthday', 'date')).not.toThrowError();
  });
});
