// sum.test.js
import { describe, expect, test } from 'vitest';

import { superType } from './SuperType';

describe('superType', () => {
  test('Identifies an Array', () => {
    const dummy = ['Lorem', 'Ipsum'];
    expect(superType(dummy)).toBe('array');
  });

  test('Identifies a GigInt', () => {
    const dummy = BigInt(9007199254740991);
    expect(superType(dummy)).toBe('bigint');
  });

  test('Identifies a Boolean', () => {
    const dummy = false;
    expect(superType(dummy)).toBe('boolean');
  });

  test('Identifies a Date', () => {
    const dummy = new Date();
    expect(superType(dummy)).toBe('date');
  });

  test('Identifies an error', () => {
    const dummy = new Error();
    expect(superType(dummy)).toBe('error');
  });

  test('Identifies a Function', () => {
    const dummy = () => {};
    expect(superType(dummy)).toBe('function');
  });

  test('Identifies a Map', () => {
    const dummy = new Map();
    expect(superType(dummy)).toBe('map');
  });

  test('Identifies null', () => {
    const dummy = null;
    expect(superType(dummy)).toBe('null');
  });

  test('Identifies a Number', () => {
    const dummy = 123456789;
    expect(superType(dummy)).toBe('number');
  });

  test('Identifies an Object', () => {
    const dummy = new Object();
    expect(superType(dummy)).toBe('object');
  });

  test('Identifies a Promise', () => {
    const dummy = new Promise((resolve) => {
      resolve('Lorem Ipsum');
    });

    expect(superType(dummy)).toBe('promise');
  });

  test('Identifies a RegExp', () => {
    const dummy = new RegExp(/^\w+/);

    expect(superType(dummy)).toBe('regexp');
  });

  test('Identifies a RegExp', () => {
    const dummy = new Set();

    expect(superType(dummy)).toBe('set');
  });

  test('Identifies a String', () => {
    const dummy = 'Lorem Ipsum';
    expect(superType(dummy)).toBe('string');
  });

  test('Identifies a Symbol', () => {
    const dummy = Symbol('id');

    expect(superType(dummy)).toBe('symbol');
  });

  test('Identifies undefined', () => {
    const dummy = undefined;

    expect(superType(dummy)).toBe('undefined');
  });
});
