// Inspiration : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures
// Source : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects

export enum UnsupportedTypeEnum {
  INFINITY = 'Infinity', // Identifies as a Number
  NAN = 'NaN', // Identifies as a Number
  ITERATOR = 'Iterator', // Experimental (abstract class)
}

export enum TypeEnum {
  ARRAY = 'Array',
  ARRAY_BUFFER = 'ArrayBuffer',
  ATOMICS = 'Atomics',
  BIGINT = 'BigInt',
  BIGINT_64_ARRAY = 'BigInt64Array',
  BIGUINT_64_ARRAY = 'BigUint64Array',
  BOOLEAN = 'Boolean',
  DATE = 'Date',
  DATA_VIEW = 'DataView',
  ERROR = 'Error',
  FLOAT_32_ARRAY = 'Float32Array',
  FLOAT_64_ARRAY = 'Float64Array',
  FUNCTION = 'Function',
  GENERATOR = 'Generator',
  INT_16_ARRAY = 'Int16Array',
  INT_32_ARRAY = 'Int32Array',
  INT_8_ARRAY = 'Int8Array',
  INTL = 'Intl',
  JSON = 'JSON',
  MAP = 'Map',
  MATH = 'Math',
  NULL = 'null',
  NUMBER = 'Number',
  OBJECT = 'Object',
  PROMISE = 'Promise',
  REFLECT = 'Reflect',
  REGEXP = 'RegExp',
  SET = 'Set',
  SHARED_ARRAY_BUFFER = 'SharedArrayBuffer',
  STRING = 'String',
  SYMBOL = 'Symbol',
  TYPED_ARRAY = 'TypedArray',
  UINT_16_ARRAY = 'Uint16Array',
  UINT_32_ARRAY = 'Uint32Array',
  UINT_8_ARRAY = 'Uint8Array',
  UINT_8_CLAMPED_ARRAY = 'Uint8ClampedArray',
  UNDEFINED = 'undefined',
  WEAK_MAP = 'WeakMap',
  WEAK_REF = 'WeakRef',
  WEAK_SET = 'WeakSet',
}

export type KnownType = `${TypeEnum}`;

class TypeIdentifier {
  #unknown: unknown;
  constructor(unknown: unknown) {
    this.#unknown = unknown;
  }

  private isKnown(type: string): boolean {
    return Object.values(TypeEnum).includes(type as TypeEnum);
  }

  get type(): KnownType {
    if (this.#unknown === undefined) return TypeEnum.UNDEFINED;
    if (this.#unknown === null) return TypeEnum.NULL;

    // Pattern : [object Type-of-value] with a capital letter in most cases.
    const regexp = /^\[object (\w+)\]$/gm;
    const result: RegExpExecArray | null = regexp.exec(Object.prototype.toString.call(this.#unknown));

    // Edge Case : Regexp didn't find any results. (Branch not covered during test)
    if (!result) throw new Error(`${this.#unknown} is an unknown type for the current interpretor (regexp).`);

    const type: string = result[1];

    // Edge Case : TypeEnum does not contains the given type. (i.e New type in JavaScript)
    if (!this.isKnown(type)) throw new Error(`${type} doesn't exists in TypeEnum.`);

    return type as KnownType;
  }

  is(target: KnownType): boolean {
    return this.type === target;
  }
}

export function TypeOf(unknown: unknown): TypeIdentifier {
  return new TypeIdentifier(unknown);
}
