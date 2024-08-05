// sum.test.js
import { describe, expect, test } from 'vitest';

import { isSuperEnum, superType } from './SuperType';

describe('isSuperEnum', () => {
  test('Receives a known type', () => {
    expect(isSuperEnum('array')).toBeTruthy();
  });

  test('Receives an unknown type', () => {
    expect(isSuperEnum('unknown type')).toBeFalsy();
  });
});

describe('superType', () => {
  test('Identifies an Array', () => {
    const dummy = ['Lorem', 'Ipsum'];
    expect(superType(dummy)).toBe('array');
  });

  test('Identifies a BigInt', () => {
    const dummy = BigInt(9007199254740991);
    expect(superType(dummy)).toBe('bigint');
  });

  test('Identifies a Boolean', () => {
    const dummy = new Boolean(false);
    expect(superType(dummy)).toBe('boolean');
  });

  test('Identifies a Date', () => {
    const dummy = new Date();
    expect(superType(dummy)).toBe('date');
  });

  test('Identifies an Error', () => {
    const dummy = new Error();
    expect(superType(dummy)).toBe('error');
  });

  test('Identifies a Function', () => {
    const dummy = new Function();
    expect(superType(dummy)).toBe('function');
  });

  test('Identifies JSON (as an intrinsic object)', () => {
    expect(superType(JSON)).toBe('json');
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
    const dummy = new Number(123456789);
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

  test('Identifies a Set', () => {
    const dummy = new Set();
    expect(superType(dummy)).toBe('set');
  });

  test('Identifies a String', () => {
    const dummy = new String('Lorem Ipsum');
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

  // Tests for Edge Cases

  test('Edge case: Identifies Class as a function. Similar to typeof', () => {
    class Dog {
      constructor(public name: string) {}
    }
    expect(superType(Dog)).toBe('function');
  });

  test('Edge case: Identifies instance of a Class as object. Similar to typeof', () => {
    class Dog {
      constructor(public name: string) {}
    }
    const dummy = new Dog('Dorice');
    expect(superType(dummy)).toBe('object');
  });

  test('Edge case: Identifies Proxy as an object', () => {
    const obj = {};
    const handler = { get: () => null };
    const dummy = new Proxy(obj, handler);
    expect(superType(dummy)).toBe('object');
  });

  test('Edge case. Identifies TypeError as an error', () => {
    const dummy = new TypeError('dummy');

    expect(superType(dummy)).toBe('error');
  });

  test('Edge case...', () => {
    const dummy = new ArrayBuffer(1000);

    expect(superType(dummy)).toBe('arraybuffer');
  });

  test('Edge case...', () => {
    const dummy = Atomics;

    expect(superType(dummy)).toBe('atomics');
  });
});
