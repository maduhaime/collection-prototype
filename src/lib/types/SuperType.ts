export enum TypeEnum {
  ARRAY = 'array',
  BIGINT = 'bigint',
  BOOLEAN = 'boolean',
  DATE = 'date',
  ERROR = 'error',
  FUNCTION = 'function',
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
}

export type SuperType = `${TypeEnum}`;

// Returns the type of a given value
export function superType(value: unknown): SuperType | string | undefined {
  // Pattern : [object NameOfTheType]
  const regexp = /^\[object (\w+)\]$/gm;
  const result: RegExpExecArray | null = regexp.exec(Object.prototype.toString.call(value));

  if (result) return result[1].toLowerCase() as SuperType;
  return undefined;
}
