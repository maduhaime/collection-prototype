import { describe, expect, test } from 'vitest';
import { TypeEnum, TypeOf } from '@/lib/RunType/TypeOf';

describe('TypeOf', () => {
  test('Identifies an Array', () => {
    const unknown = ['Lorem', 'Ipsum'];
    expect(TypeOf(unknown).type).toBe(TypeEnum.ARRAY);
    expect(TypeOf(unknown).is('Array')).toBeTruthy();
  });

  test('Identifies an ArrayBuffer', () => {
    const unknown = new ArrayBuffer(8);
    expect(TypeOf(unknown).type).toBe(TypeEnum.ARRAY_BUFFER);
    expect(TypeOf(unknown).is('ArrayBuffer')).toBeTruthy();
  });

  test('Identifies an Atomics', () => {
    const unknown = Atomics;
    expect(TypeOf(unknown).type).toBe(TypeEnum.ATOMICS);
    expect(TypeOf(unknown).is('Atomics')).toBeTruthy();
  });

  test('Identifies a BigInt', () => {
    const unknown = BigInt(9007199254740991);
    expect(TypeOf(unknown).type).toBe(TypeEnum.BIGINT);
    expect(TypeOf(unknown).is('BigInt')).toBeTruthy();
  });

  test('Identifies a BigUInt64Array', () => {
    const unknown = new BigUint64Array([21n, 31n]);
    expect(TypeOf(unknown).type).toBe(TypeEnum.BIGUINT_64_ARRAY);
    expect(TypeOf(unknown).is('BigUint64Array')).toBeTruthy();
  });

  test('Identifies a Boolean', () => {
    const unknown = new Boolean(false);
    expect(TypeOf(unknown).type).toBe(TypeEnum.BOOLEAN);
    expect(TypeOf(unknown).is('Boolean')).toBeTruthy();
  });

  test('Identifies a DataView', () => {
    const buffer = new ArrayBuffer(16);
    const unknown = new DataView(buffer, 0);

    expect(TypeOf(unknown).type).toBe(TypeEnum.DATA_VIEW);
    expect(TypeOf(unknown).is('DataView')).toBeTruthy();
  });

  test('Identifies a Date', () => {
    const unknown = new Date();
    expect(TypeOf(unknown).type).toBe(TypeEnum.DATE);
    expect(TypeOf(unknown).is('Date')).toBeTruthy();
  });

  test('Identifies an Error', () => {
    const unknown = new Error();
    expect(TypeOf(unknown).type).toBe(TypeEnum.ERROR);
    expect(TypeOf(unknown).is('Error')).toBeTruthy();
  });

  test('Identifies an Float32Array', () => {
    const unknown = new Float32Array([21, 31]);
    expect(TypeOf(unknown).type).toBe(TypeEnum.FLOAT_32_ARRAY);
    expect(TypeOf(unknown).is('Float32Array')).toBeTruthy();
  });

  test('Identifies an Float64Array', () => {
    const unknown = new Float64Array([21, 31]);
    expect(TypeOf(unknown).type).toBe(TypeEnum.FLOAT_64_ARRAY);
    expect(TypeOf(unknown).is('Float64Array')).toBeTruthy();
  });

  test('Identifies a Function', () => {
    const unknown = new Function();
    expect(TypeOf(unknown).type).toBe(TypeEnum.FUNCTION);
    expect(TypeOf(unknown).is('Function')).toBeTruthy();
  });

  test('Identifies JSON (as an intrinsic object)', () => {
    const unknown = JSON;
    expect(TypeOf(unknown).type).toBe(TypeEnum.JSON);
    expect(TypeOf(unknown).is('JSON')).toBeTruthy();
  });

  test('Identifies a Int16Array', () => {
    const unknown = new Int16Array([21, 31]);
    expect(TypeOf(unknown).type).toBe(TypeEnum.INT_16_ARRAY);
    expect(TypeOf(unknown).is('Int16Array')).toBeTruthy();
  });

  test('Identifies a Int32Array', () => {
    const unknown = new Int32Array([21, 31]);
    expect(TypeOf(unknown).type).toBe(TypeEnum.INT_32_ARRAY);
    expect(TypeOf(unknown).is('Int32Array')).toBeTruthy();
  });

  test('Identifies a Int8Array', () => {
    const unknown = new Int8Array([21, 31]);
    expect(TypeOf(unknown).type).toBe(TypeEnum.INT_8_ARRAY);
    expect(TypeOf(unknown).is('Int8Array')).toBeTruthy();
  });

  test('Identifies an Intl', () => {
    expect(TypeOf(Intl).type).toBe(TypeEnum.INTL);
    expect(TypeOf(Intl).is('Intl')).toBeTruthy();
  });

  // test('Identifies an Iterator', () => {
  //   class MyIterator extends Iterator {}

  //   expect(TypeOf(Intl).type).toBe(TypeEnum.INTL);
  //   expect(TypeOf(Intl).is('Intl')).toBeTruthy();
  // });

  test('Identifies a Map', () => {
    const unknown = new Map();
    expect(TypeOf(unknown).type).toBe(TypeEnum.MAP);
    expect(TypeOf(unknown).is('Map')).toBeTruthy();
  });

  test('Identifies a Math', () => {
    const unknown = Math;
    expect(TypeOf(unknown).type).toBe(TypeEnum.MATH);
    expect(TypeOf(unknown).is('Math')).toBeTruthy();
  });

  test('Identifies null', () => {
    const unknown = null;
    expect(TypeOf(unknown).type).toBe(TypeEnum.NULL);
    expect(TypeOf(unknown).is('null')).toBeTruthy();
  });

  test('Identifies a Number', () => {
    const unknown = new Number(123456789);
    expect(TypeOf(unknown).type).toBe(TypeEnum.NUMBER);
    expect(TypeOf(unknown).is('Number')).toBeTruthy();
  });

  test('Identifies an Object', () => {
    const unknown = new Object();
    expect(TypeOf(unknown).type).toBe(TypeEnum.OBJECT);
    expect(TypeOf(unknown).is('Object')).toBeTruthy();
  });

  test('Identifies a Promise', () => {
    const unknown = new Promise((resolve) => {
      resolve('Lorem Ipsum');
    });
    expect(TypeOf(unknown).type).toBe(TypeEnum.PROMISE);
    expect(TypeOf(unknown).is('Promise')).toBeTruthy();
  });

  test('Identifies a Reflect', () => {
    const unknown = Reflect;
    expect(TypeOf(unknown).type).toBe(TypeEnum.REFLECT);
    expect(TypeOf(unknown).is('Reflect')).toBeTruthy();
  });

  test('Identifies a RegExp', () => {
    const unknown = new RegExp(/^\w+/);
    expect(TypeOf(unknown).type).toBe(TypeEnum.REGEXP);
    expect(TypeOf(unknown).is('RegExp')).toBeTruthy();
  });

  test('Identifies a Set', () => {
    const unknown = new Set();
    expect(TypeOf(unknown).type).toBe(TypeEnum.SET);
    expect(TypeOf(unknown).is('Set')).toBeTruthy();
  });

  test('Identifies a SharedArrayBuffer', () => {
    const unknown = new SharedArrayBuffer(1024);
    expect(TypeOf(unknown).type).toBe(TypeEnum.SHARED_ARRAY_BUFFER);
    expect(TypeOf(unknown).is('SharedArrayBuffer')).toBeTruthy();
  });

  test('Identifies a String', () => {
    const unknown = new String('Lorem Ipsum');
    expect(TypeOf(unknown).type).toBe(TypeEnum.STRING);
    expect(TypeOf(unknown).is('String')).toBeTruthy();
  });

  test('Identifies a Symbol', () => {
    const unknown = Symbol('id');
    expect(TypeOf(unknown).type).toBe(TypeEnum.SYMBOL);
    expect(TypeOf(unknown).is('Symbol')).toBeTruthy();
  });

  test('Identifies a Uint16Array', () => {
    const unknown = new Uint16Array([21, 31]);
    expect(TypeOf(unknown).type).toBe(TypeEnum.UINT_16_ARRAY);
    expect(TypeOf(unknown).is('Uint16Array')).toBeTruthy();
  });

  test('Identifies a Uint32Array', () => {
    const unknown = new Uint32Array([21, 31]);
    expect(TypeOf(unknown).type).toBe(TypeEnum.UINT_32_ARRAY);
    expect(TypeOf(unknown).is('Uint32Array')).toBeTruthy();
  });

  test('Identifies a Uint8Array', () => {
    const unknown = new Uint8Array([21, 31]);
    expect(TypeOf(unknown).type).toBe(TypeEnum.UINT_8_ARRAY);
    expect(TypeOf(unknown).is('Uint8Array')).toBeTruthy();
  });

  test('Identifies a Uint8ClampedArray', () => {
    const unknown = new Uint8ClampedArray([21, 31]);
    expect(TypeOf(unknown).type).toBe(TypeEnum.UINT_8_CLAMPED_ARRAY);
    expect(TypeOf(unknown).is('Uint8ClampedArray')).toBeTruthy();
  });

  test('Identifies undefined', () => {
    const unknown = undefined;
    expect(TypeOf(unknown).type).toBe(TypeEnum.UNDEFINED);
    expect(TypeOf(unknown).is('undefined')).toBeTruthy();
  });

  test('Identifies a WeakMap', () => {
    const unknown = new WeakMap();
    expect(TypeOf(unknown).type).toBe(TypeEnum.WEAK_MAP);
    expect(TypeOf(unknown).is('WeakMap')).toBeTruthy();
  });

  test('Identifies a WeakRef', () => {
    const target = { name: 'Lorem Ipsum' };
    const unknown = new WeakRef(target);
    expect(TypeOf(unknown).type).toBe(TypeEnum.WEAK_REF);
    expect(TypeOf(unknown).is('WeakRef')).toBeTruthy();
  });

  test('Identifies a WeakSet', () => {
    const unknown = new WeakSet();
    expect(TypeOf(unknown).type).toBe(TypeEnum.WEAK_SET);
    expect(TypeOf(unknown).is('WeakSet')).toBeTruthy();
  });
});

// Tests for Edge Cases
describe('TypeOf with Class', () => {
  class Dog {
    constructor(public name: string) {}
  }

  test('Identifies Class as a function. Similar to native typeof', () => {
    expect(TypeOf(Dog).type).toBe(TypeEnum.FUNCTION);
    expect(TypeOf(Dog).is('Function')).toBeTruthy();
  });

  test('Identifies instance of a Class as object. Similar to native typeof', () => {
    const unknown = new Dog('Dorice');
    expect(TypeOf(unknown).type).toBe(TypeEnum.OBJECT);
    expect(TypeOf(unknown).is('Object')).toBeTruthy();
  });
});

describe('Edge case', () => {
  test('Edge case: Identifies a Generator', () => {
    function* infinite() {
      let index = 0;
      while (true) yield index++;
    }
    const generator = infinite();
    expect(TypeOf(generator).type).toBe(TypeEnum.GENERATOR);
    expect(TypeOf(generator).is('Generator')).toBeTruthy();
  });

  test('Edge case: Identifies Infinity as a Number', () => {
    const unknown = Infinity;
    expect(TypeOf(unknown).type).toBe(TypeEnum.NUMBER);
    expect(TypeOf(unknown).is('Number')).toBeTruthy();
  });

  test('Edge case: Identifies a NaN as a Number', () => {
    const unknown = NaN;
    expect(TypeOf(unknown).type).toBe(TypeEnum.NUMBER);
    expect(TypeOf(unknown).is('Number')).toBeTruthy();
  });

  test('Edge case: Identifies Proxy as an object', () => {
    const obj = {};
    const handler = { get: () => null };
    const unknown = new Proxy(obj, handler);
    expect(TypeOf(unknown).type).toBe(TypeEnum.OBJECT);
    expect(TypeOf(unknown).is('Object')).toBeTruthy();
  });

  test('Edge case: Identifies (volontary) unsupported type (FinalizationRegistry)', () => {
    let user = { name: 'Marc' };

    function cleanupCallback(heldValue: unknown): void {
      console.log(`${heldValue} has been collected by the garbage collector.`);
    }

    const registry = new FinalizationRegistry(cleanupCallback);
    registry.register(user, user.name);
    expect(() => TypeOf(registry).type).toThrowError();
  });

  test('Edge case: Defaults to undefined when no argument.', () => {
    // @ts-ignore
    const noArgs = TypeOf();
    expect(noArgs.type).toBe(TypeEnum.UNDEFINED);
    expect(noArgs.is('undefined')).toBeTruthy();
  });
});
