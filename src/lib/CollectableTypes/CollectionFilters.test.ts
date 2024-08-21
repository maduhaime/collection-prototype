// sum.test.js
import { describe, expect, test } from 'vitest';
import {
  BooleanCompare,
  booleanFilter,
  DateCompare,
  dateFilter,
  NumberCompare,
  numberFilter,
  StringCompare,
  stringFilter,
} from './CollectionFilters';

// ATTENTION: Filters function do not allow join type with null. i.e. name: string | null
type DummyType = {
  id: number;
  name?: string;
  qty?: number;
  date?: Date;
  active?: Boolean;
};

describe('CollectionFilters / booleanFilter', () => {
  const dummyItems: DummyType[] = [
    { id: 1, active: true },
    { id: 2, active: false },
  ];

  test('Filters where field equals target', () => {
    const result = booleanFilter(dummyItems, 'active', BooleanCompare.EQUALS, true);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  test('Filters where field do not equals target', () => {
    const result = booleanFilter(dummyItems, 'active', BooleanCompare.NOT_EQUALS, true);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });
});

describe('CollectionFilters / numberFilter', () => {
  const dummyItems: DummyType[] = [
    { id: 1, qty: 1 },
    { id: 2, qty: 2 },
  ];

  test('Filters where field equals target', () => {
    const result = numberFilter(dummyItems, 'qty', NumberCompare.EQUALS, 1);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  test('Filters where field do not equals target', () => {
    const result = numberFilter(dummyItems, 'qty', NumberCompare.NOT_EQUALS, 1);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  test('Filters where field is greater than target', () => {
    const result = numberFilter(dummyItems, 'qty', NumberCompare.GREATER_THAN, 1);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  test('Filters where field is greater than or equals to target', () => {
    const result = numberFilter(dummyItems, 'qty', NumberCompare.GREATER_THAN_OR_EQUALS, 1);
    expect(result).toHaveLength(2);
  });

  test('Filters where field is less than target', () => {
    const result = numberFilter(dummyItems, 'qty', NumberCompare.LESS_THAN, 2);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  test('Filters where field is less than or equals to target', () => {
    const result = numberFilter(dummyItems, 'qty', NumberCompare.LESS_THAN_OR_EQUALS, 2);
    expect(result).toHaveLength(2);
  });
});

describe('CollectionFilters / stringFilter', () => {
  const dummyItems: DummyType[] = [
    { id: 1, name: 'Anthony' },
    { id: 2, name: 'Zachary' },
  ];

  test('Filters where field equals target', () => {
    const result = stringFilter(dummyItems, 'name', StringCompare.EQUALS, 'Anthony');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  test('Filters where field do not equals target', () => {
    const result = stringFilter(dummyItems, 'name', StringCompare.NOT_EQUALS, 'Anthony');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  test('Filters where field includes target', () => {
    const result = stringFilter(dummyItems, 'name', StringCompare.INCLUDES, 'Anth');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  test('Filters where field do not includes target', () => {
    const result = stringFilter(dummyItems, 'name', StringCompare.NOT_INCLUDES, 'Anth');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });
});

describe('CollectionFilters / dateFilter', () => {
  const dummyItems: DummyType[] = [
    { id: 1, date: new Date('2000-01-01') },
    { id: 2, date: new Date('2024-12-12') },
    { id: 3, date: undefined },
  ];

  test('Filters where field equals target', () => {
    const result = dateFilter(dummyItems, 'date', DateCompare.EQUALS, new Date('2000-01-01'));
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  test('Filters where field do not equals target', () => {
    const result = dateFilter(dummyItems, 'date', DateCompare.NOT_EQUALS, new Date('2000-01-01'));
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  test('Filters where field greater than target', () => {
    const result = dateFilter(dummyItems, 'date', DateCompare.GREATER_THAN, new Date('2000-07-07'));
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  test('Filters where field is greater than or equals to target', () => {
    const result = dateFilter(dummyItems, 'date', DateCompare.GREATER_THAN_OR_EQUALS, new Date('2000-01-01'));
    expect(result).toHaveLength(2);
  });

  test('Filters where field greater than target', () => {
    const result = dateFilter(dummyItems, 'date', DateCompare.LESS_THAN, new Date('2024-12-12'));
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  test('Filters where field is greater than or equals to target', () => {
    const result = dateFilter(dummyItems, 'date', DateCompare.LESS_THAN_OR_EQUALS, new Date('2024-12-12'));
    expect(result).toHaveLength(2);
  });
});
