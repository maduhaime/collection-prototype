// sum.test.js
import { describe, expect, test } from 'vitest';

import { CollectionBase } from './CollectionBase';

type DummyType = {
  id: number;
  name: string;
  age: number;
  birthday: Date;
};

describe('CollectionScope', () => {
  const dummyItems: DummyType[] = [
    { id: 1, name: 'Anthony', age: 20, birthday: new Date('2005-01-01') },
    { id: 2, name: 'Zachary', age: 30, birthday: new Date('1995-01-01') },
  ];

  test('Returns collection items', () => {
    const collection = new CollectionBase(dummyItems);

    expect(collection.items).toBe(dummyItems);
  });

  test('Counts items in a collection', () => {
    const collection = new CollectionBase(dummyItems);

    expect(collection.count).toBe(2);
  });

  test('Scopes items by field', () => {
    const collection = new CollectionBase(dummyItems);

    expect(collection.field_equals('name', 'Anthony').items).toStrictEqual(dummyItems.splice(0, 1));
  });

  test('Sorts by string ASC and DESC', () => {
    const collection = new CollectionBase(dummyItems);

    expect(collection.sort('name', 'asc', 'string').items).toStrictEqual(dummyItems);
    expect(collection.sort('name', 'desc', 'string').items).toStrictEqual(dummyItems.reverse());
  });

  test('Sorts by number ASC and DESC', () => {
    const collection = new CollectionBase(dummyItems);

    expect(collection.sort('age', 'asc', 'number').items).toStrictEqual(dummyItems);
    expect(collection.sort('age', 'desc', 'number').items).toStrictEqual(dummyItems.reverse());
  });

  test('Sorts by date ASC and DESC', () => {
    const collection = new CollectionBase(dummyItems);

    expect(collection.sort('birthday', 'asc', 'date').items).toStrictEqual(dummyItems.reverse());
    expect(collection.sort('birthday', 'desc', 'date').items).toStrictEqual(dummyItems);
  });

  test('Resets the collection to its original value', () => {
    const collection = new CollectionBase(dummyItems);

    collection.field_equals('age', 20);
    collection.reset();

    expect(collection.items).toStrictEqual(dummyItems);
  });
});
