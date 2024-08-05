// sum.test.js
import { describe, expect, test } from 'vitest';

import { isValidDate, isValidNumber } from './Casting';

describe('isValidDate', () => {
  test('Identifies a Date', () => {
    const dateStr = `${new Date()}`;
    expect(isValidDate(dateStr)).toBeTruthy();
  });

  test('Rejects a String', () => {
    const dateStr = 'Lorem Ipsum';
    expect(isValidDate(dateStr)).toBeFalsy();
  });
  test('Rejects a Number', () => {
    const dateStr = '20240214';
    expect(isValidDate(dateStr)).toBeFalsy();
  });
});

describe('isValidNumber', () => {
  test('Identifies a Number', () => {
    const numberStr = '123';
    expect(isValidNumber(numberStr)).toBeTruthy();
  });
  test('Rejects a Date', () => {
    const numberStr = `${new Date()}`;
    expect(isValidNumber(numberStr)).toBeFalsy();
  });

  test('Rejects a String', () => {
    const numberStr = 'Lorem Ipsum';
    expect(isValidNumber(numberStr)).toBeFalsy();
  });
});
