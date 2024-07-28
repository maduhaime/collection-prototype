// sum.test.js
import { describe, expect, test } from 'vitest';

import { sortByDateField, sortByNumberField, sortByStringField } from './CollectionSort';

type DummyType = {
  id: number;
  name?: string;
  qty?: number;
  date?: Date;
};

describe('CollectionSort', () => {
  test('Sorts by string field (ASC)', () => {
    const dummyItems: DummyType[] = [
      { id: 1, name: 'Anthony' },
      { id: 2, name: 'Zachary' },
    ];

    const result = sortByStringField(dummyItems, 'name', 'asc');

    expect(result[0].id).toBe(1);
  });

  test('Sorts by string field (DESC)', () => {
    const dummyItems: DummyType[] = [
      { id: 1, name: 'Anthony' },
      { id: 2, name: 'Zachary' },
    ];

    const result = sortByStringField(dummyItems, 'name', 'desc');

    expect(result[0].id).toBe(2);
  });

  test('Sorts by number field (ASC)', () => {
    const dummyItems: DummyType[] = [
      { id: 1, qty: 100 },
      { id: 2, qty: 999 },
    ];

    const result = sortByNumberField(dummyItems, 'qty', 'asc');

    expect(result[0].id).toBe(1);
  });

  test('Sorts by number field (DESC)', () => {
    const dummyItems: DummyType[] = [
      { id: 1, qty: 100 },
      { id: 2, qty: 999 },
    ];

    const result = sortByNumberField(dummyItems, 'qty', 'desc');

    expect(result[0].id).toBe(2);
  });

  test('Sorts by date field (ASC)', () => {
    const dummyItems: DummyType[] = [
      { id: 1, date: new Date('2000-01-01') },
      { id: 2, date: new Date('2024-12-12') },
    ];

    const result = sortByDateField(dummyItems, 'date', 'asc');

    expect(result[0].id).toBe(1);
  });

  test('Sorts by date field (DESC)', () => {
    const dummyItems: DummyType[] = [
      { id: 1, date: new Date('2000-01-01') },
      { id: 2, date: new Date('2024-12-12') },
    ];

    const result = sortByDateField(dummyItems, 'date', 'desc');

    expect(result[0].id).toBe(2);
  });
});
