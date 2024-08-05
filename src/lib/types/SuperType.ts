// Inspiration : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures
// Source : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects

export enum SuperEnum {
  ARRAY = 'array',
  BIGINT = 'bigint',
  BOOLEAN = 'boolean',
  DATE = 'date',
  ERROR = 'error',
  FUNCTION = 'function',
  JSON = 'json',
  MAP = 'map',
  NULL = 'null',
  NUMBER = 'number',
  OBJECT = 'object',
  PROMISE = 'promise',
  REGEXP = 'regexp',
  SET = 'set',
  STRING = 'string',
  SYMBOL = 'symbol',
  UNDEFINED = 'undefined',

  // edge
  ARRAY_BUFFER = 'arraybuffer',
  ATOMICS = 'atomics',
  /*
  AggregateError
  - Array
  ArrayBuffer
  AsyncFunction
  AsyncGenerator
  AsyncGeneratorFunction
  AsyncIterator
  Atomics
  - BigInt
  BigInt64Array
  BigUint64Array
  - Boolean
  DataView
  - Date
  decodeURI()
  decodeURIComponent()
  encodeURI()
  encodeURIComponent()
  - Error
  escape()Deprecated
  eval()
  EvalError
  FinalizationRegistry
  Float16Array
  Float32Array
  Float64Array
  - Function
  Generator
  GeneratorFunction
  globalThis
  Infinity
  Int16Array
  Int32Array
  Int8Array
  InternalErrorNon-standard
  Intl
  isFinite()
  isNaN()
  Iterator
  - JSON
  - Map
  Math
  NaN
  - Number
  - Object
  parseFloat()
  parseInt()
  - Promise
  Proxy
  RangeError
  ReferenceError
  Reflect
  - RegExp
  - Set
  SharedArrayBuffer
  - String
  - Symbol
  SyntaxError
  TypedArray
  TypeError
  Uint16Array
  Uint32Array
  Uint8Array
  Uint8ClampedArray
  undefined
  unescape()Deprecated
  URIError
  WeakMap
  WeakRef
  WeakSet
  */
}

export type SuperType = `${SuperEnum}`;

export function isSuperEnum(type: string): boolean {
  return Object.values(SuperEnum).includes(type as SuperEnum);
}

// Returns the type of a given value
export function superType(value: unknown): SuperType {
  if (value === undefined) return SuperEnum.UNDEFINED;
  if (value === null) return SuperEnum.NULL;

  // Pattern : [object Type-of-value] with a capital letter.
  const regexp = /^\[object (\w+)\]$/gm;
  const result: RegExpExecArray | null = regexp.exec(Object.prototype.toString.call(value));

  // Edge Case : egexp didn't find any results.
  if (result === null) throw new Error(`${value} as an unknown type.`);

  const type: string = result[1].toLowerCase();

  // Edge Case : SuperEnum does not contains the given type. (i.e New type in JavaScript)
  if (!isSuperEnum(type)) throw new Error(`${type} doesn't exists in SuperEnum.`);

  return type as SuperType;
}
