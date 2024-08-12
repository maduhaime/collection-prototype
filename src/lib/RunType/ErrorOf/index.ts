export enum ErrorEnum {
  AGGREGATOR_ERROR = 'AggregateError',
  EVAL_ERROR = 'EvalError',
  RANGE_ERROR = 'RangeError',
  REFERENCE_ERROR = 'ReferenceError',
  SYNTAX_ERROR = 'SyntaxError',
  TYPE_ERROR = 'TypeError',
  URI_ERROR = 'URIError',
}

export type KnownError = `${ErrorEnum}`;

class ErrorIdentifier {
  #error: unknown;
  constructor(error: unknown) {
    this.#error = error;
  }

  private isKnown(type: KnownError): boolean {
    return Object.values(ErrorEnum).includes(type as ErrorEnum);
  }

  get type(): KnownError {
    if (this.#error instanceof Error === false) throw new Error(`${this.#error} is not an instance of Error.`);

    if (this.#error instanceof AggregateError) return ErrorEnum.AGGREGATOR_ERROR;
    if (this.#error instanceof EvalError) return ErrorEnum.EVAL_ERROR;
    if (this.#error instanceof RangeError) return ErrorEnum.RANGE_ERROR;
    if (this.#error instanceof ReferenceError) return ErrorEnum.REFERENCE_ERROR;
    if (this.#error instanceof SyntaxError) return ErrorEnum.SYNTAX_ERROR;
    if (this.#error instanceof TypeError) return ErrorEnum.TYPE_ERROR;
    if (this.#error instanceof URIError) return ErrorEnum.URI_ERROR;

    throw new Error(`${this.#error} is an unsuported Error.`);
  }

  is(target: KnownError): boolean {
    if (!this.isKnown(target)) throw new Error(`${target} doesn't exists in ErrorEnum.`);

    return this.type === target;
  }
}

export function ErrorOf(unknown: unknown): ErrorIdentifier {
  return new ErrorIdentifier(unknown);
}
