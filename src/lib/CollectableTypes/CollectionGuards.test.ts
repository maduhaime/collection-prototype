import { describe, expect, test } from 'vitest';

import { fieldGuard, nullGuard, typeofGuard, undefinedGuard } from '@/lib/CollectableTypes/CollectionGuards';
import { TypeEnum } from '@/lib/RunType/TypeOf';

// Type for name is volontary sets to number, null and undefined, to avoid type error during test.
type DummyType = {
  id: number;
  name?: string | number | null | undefined;
  age?: number;
  birthday?: Date;
};

describe('CollectionGuard / fieldGuard', () => {
  test('Throws an error if a given field in not present in every items on an Array', () => {
    const dummyItems: DummyType[] = [{ id: 1, name: 'Anthony' }, { id: 2 }];

    expect(() => fieldGuard(dummyItems, 'name')).toThrowError();
  });
});

describe('CollectionGuard / undefinedGuard', () => {
  test('Throws an error if a given field is undefined at lease in one item of an Array', () => {
    const dummyItems: DummyType[] = [
      { id: 1, name: 'Anthony' },
      { id: 2, name: undefined },
    ];

    expect(() => undefinedGuard(dummyItems, 'name')).toThrowError();
  });

  test('Throws an error if a given field is null at lease in one item of an Array', () => {
    const dummyItems: DummyType[] = [
      { id: 1, name: 'Anthony' },
      { id: 2, name: null },
    ];

    expect(() => nullGuard(dummyItems, 'name')).toThrowError();
  });
});

describe('CollectionGuard / typeofGuard', () => {
  test('Throws an error if a given field is not of a given type in all items of an Array', () => {
    const dummyItems: DummyType[] = [
      { id: 1, name: 'Anthony' },
      { id: 2, name: 2 },
    ];

    expect(() => typeofGuard(dummyItems, 'name', TypeEnum.STRING)).toThrowError();
  });

  test('Executes without throwing an error', () => {
    const dummyItems: DummyType[] = [
      { id: 1, name: 'Anthony', age: 20, birthday: new Date('2005-01-01') },
      { id: 2, name: 'Zachary', age: 30, birthday: new Date('1995-01-01') },
    ];

    expect(() => typeofGuard(dummyItems, 'birthday', TypeEnum.DATE)).not.toThrowError();
  });
});
