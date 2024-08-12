// sum.test.js
import { describe, expect, test } from 'vitest';

import { CollectionBase } from './CollectionBase';
import { TypeEnum } from '../RunType/TypeOf';

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

  test('Scopes items by field (String)', () => {
    const collection = new CollectionBase(dummyItems);
    const expected = [dummyItems.at(0)];

    expect(collection.field_equals('name', 'Anthony').items).toStrictEqual(expected);
  });

  test('Scopes items by field (Number)', () => {
    const collection = new CollectionBase(dummyItems);
    const expected = [dummyItems.at(0)];

    expect(collection.field_equals('age', 20).items).toStrictEqual(expected);
  });

  test('Scopes items by field (Date)', () => {
    const date = new Date('1995-01-01');
    const collection = new CollectionBase(dummyItems);
    const expected = [dummyItems.at(1)];

    expect(collection.field_equals('birthday', date).items).toStrictEqual(expected);
  });

  test('Sorts by string ASC and DESC', () => {
    const collection = new CollectionBase(dummyItems);

    expect(collection.sort('name', 'asc', TypeEnum.STRING).items).toStrictEqual(dummyItems);
    expect(collection.sort('name', 'desc', TypeEnum.STRING).items).toStrictEqual(dummyItems.reverse());
  });

  test('Sorts by number ASC and DESC', () => {
    const collection = new CollectionBase(dummyItems);

    expect(collection.sort('age', 'asc', TypeEnum.NUMBER).items).toStrictEqual(dummyItems);
    expect(collection.sort('age', 'desc', TypeEnum.NUMBER).items).toStrictEqual(dummyItems.reverse());
  });

  test('Sorts by date ASC and DESC', () => {
    const collection = new CollectionBase(dummyItems);

    expect(collection.sort('birthday', 'asc', TypeEnum.DATE).items).toStrictEqual(dummyItems.reverse());
    expect(collection.sort('birthday', 'desc', TypeEnum.DATE).items).toStrictEqual(dummyItems);
  });

  test('Resets the collection to its original value', () => {
    const collection = new CollectionBase(dummyItems);

    collection.field_equals('age', 20);
    collection.reset();

    expect(collection.items).toStrictEqual(dummyItems);
  });

  test('Scopes items using a Scope Chain (single link as string)', () => {
    const collection = new CollectionBase(dummyItems);

    collection.scope('field_equals(name, Anthony)');

    const expected = [dummyItems.at(0)];
    expect(collection.items).toStrictEqual(expected);
  });

  test('Scopes items using a Scope Chain (single link as number)', () => {
    const collection = new CollectionBase(dummyItems);

    collection.scope('field_equals(id, 1)');

    const expected = [dummyItems.at(0)];
    expect(collection.items).toStrictEqual(expected);
  });

  test('Scopes items using a Scope Chain (single link as date)', () => {
    const collection = new CollectionBase(dummyItems);

    const target = new Date('1995-01-01');
    collection.scope(`field_equals(birthday, ${target})`);

    const expected = [dummyItems.at(1)];
    expect(collection.items).toStrictEqual(expected);
  });

  test('Scopes items using a Scope Chain (multiple link)', () => {
    const collection = new CollectionBase(dummyItems);

    collection.scope('field_equals(name, Anthony)|field_equals(id, 1)');

    const expected = [dummyItems.at(0)];
    expect(collection.items).toStrictEqual(expected);
  });

  test('Throws an error if a Scope Chain link does not match a function', () => {
    const collection = new CollectionBase(dummyItems);

    expect(() => collection.scope('field_equals(graduation, 2008')).toThrowError();
  });
});
