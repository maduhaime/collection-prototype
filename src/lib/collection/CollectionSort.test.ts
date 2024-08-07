// sum.test.js
import { describe, expect, test } from 'vitest';

import { hasNull, sortByDateField, sortByNumberField, sortByStringField } from './CollectionSort';

type DummyType = {
  id: number;
  name?: string | null;
  qty?: number | null;
  date?: Date | null;
};

describe('CollectionSort / hasNull', () => {
  test('Returns true when at least one param is null', () => {
    const result = hasNull('ABC', null);

    expect(result).toBeTruthy();
  });

  test('Returns false when both params are not null', () => {
    const result = hasNull('ABC', 'DEF');

    expect(result).toBeFalsy();
  });
});

describe('CollectionSort', () => {
  test('Sorts by string field (ASC)', () => {
    const dummyItems: DummyType[] = [
      { id: 1, name: 'Anthony' },
      { id: 2, name: 'Zachary' },
    ];

    const result = sortByStringField(dummyItems, 'name', 'asc');

    expect(result[0].id).toBe(1);
  });

  // TODO: Where should go null values? At the beginning or the end.
  test('Sorts by string field (ASC) with null', () => {
    const dummyItems: DummyType[] = [
      { id: 1, name: 'Anthony' },
      { id: 2, name: 'Zachary' },
      { id: 3, name: null },
    ];

    const result = sortByStringField(dummyItems, 'name', 'asc');

    expect(result[0].id).toBe(3);
    expect(result[1].id).toBe(1);
    expect(result[2].id).toBe(2);
  });

  test('Sorts by string field (DESC)', () => {
    const dummyItems: DummyType[] = [
      { id: 1, name: 'Anthony' },
      { id: 2, name: 'Zachary' },
    ];

    const result = sortByStringField(dummyItems, 'name', 'desc');

    expect(result[0].id).toBe(2);
  });

  // TODO: Where should go null values? At the beginning or the end.
  test('Sorts by string field (DESC) with null', () => {
    const dummyItems: DummyType[] = [
      { id: 1, name: 'Anthony' },
      { id: 2, name: 'Zachary' },
      { id: 3, name: null },
    ];

    const result = sortByStringField(dummyItems, 'name', 'desc');

    expect(result[0].id).toBe(2);
    expect(result[1].id).toBe(1);
    expect(result[2].id).toBe(3);
  });

  test('Sorts by number field (ASC)', () => {
    const dummyItems: DummyType[] = [
      { id: 1, qty: 100 },
      { id: 2, qty: 999 },
    ];

    const result = sortByNumberField(dummyItems, 'qty', 'asc');

    expect(result[0].id).toBe(1);
  });

  test('Sorts by number field with null (ASC)', () => {
    const dummyItems: DummyType[] = [
      { id: 1, qty: 100 },
      { id: 2, qty: 999 },
      { id: 3, qty: null },
    ];

    const result = sortByNumberField(dummyItems, 'qty', 'asc');

    expect(result[0].id).toBe(3);
    expect(result[2].id).toBe(2);
  });

  test('Sorts by number field (DESC)', () => {
    const dummyItems: DummyType[] = [
      { id: 1, qty: 100 },
      { id: 2, qty: 999 },
    ];

    const result = sortByNumberField(dummyItems, 'qty', 'desc');

    expect(result[0].id).toBe(2);
  });

  test('Sorts by number field with null (DESC)', () => {
    const dummyItems: DummyType[] = [
      { id: 1, qty: 100 },
      { id: 2, qty: 999 },
      { id: 3, qty: null },
    ];

    const result = sortByNumberField(dummyItems, 'qty', 'desc');

    expect(result[0].id).toBe(2);
    expect(result[2].id).toBe(3);
  });

  test('Sorts by date field (ASC)', () => {
    const dummyItems: DummyType[] = [
      { id: 1, date: new Date('2000-01-01') },
      { id: 2, date: new Date('2024-12-12') },
    ];

    const result = sortByDateField(dummyItems, 'date', 'asc');

    expect(result[0].id).toBe(1);
  });

  // TODO: Where should go null values? At the beginning or the end.
  // TODO: Fix this. Cannot read properties of null (reading 'getTime').
  test('Sorts by date field (ASC) with null', () => {
    const dummyItems: DummyType[] = [
      { id: 1, date: new Date('2000-01-01') },
      { id: 2, date: new Date('2024-12-12') },
      { id: 3, date: null },
    ];

    const result = sortByDateField(dummyItems, 'date', 'asc');

    expect(result[0].id).toBe(3);
    expect(result[1].id).toBe(1);
    expect(result[2].id).toBe(2);
  });

  test('Sorts by date field (DESC)', () => {
    const dummyItems: DummyType[] = [
      { id: 1, date: new Date('2000-01-01') },
      { id: 2, date: new Date('2024-12-12') },
    ];

    const result = sortByDateField(dummyItems, 'date', 'desc');

    expect(result[0].id).toBe(2);
  });

  // TODO: Where should go null values? At the beginning or the end.
  // TODO: Fix this. Cannot read properties of null (reading 'getTime').
  test('Sorts by date field (DESC) with null', () => {
    const dummyItems: DummyType[] = [
      { id: 1, date: new Date('2000-01-01') },
      { id: 2, date: new Date('2024-12-12') },
      { id: 3, date: null },
    ];

    const result = sortByDateField(dummyItems, 'date', 'desc');

    expect(result[0].id).toBe(2);
    expect(result[1].id).toBe(1);
    expect(result[2].id).toBe(3);
  });
});
