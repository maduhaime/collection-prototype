import { describe, expect, test } from 'vitest';
import { ErrorEnum, ErrorOf } from '@/lib/RunType/ErrorOf';

describe('ErrorOf', () => {
  test('Identifies an AggregateError', () => {
    const unknown = new AggregateError([new Error()], 'Message');
    expect(ErrorOf(unknown).type).toBe(ErrorEnum.AGGREGATOR_ERROR);
    expect(ErrorOf(unknown).is('AggregateError')).toBeTruthy();
  });

  test('Identifies an EvalError', () => {
    const unknown = new EvalError('unknown');
    expect(ErrorOf(unknown).type).toBe(ErrorEnum.EVAL_ERROR);
    expect(ErrorOf(unknown).is('EvalError')).toBeTruthy();
  });

  test('Identifies a RangeError', () => {
    const unknown = new RangeError('unknown');
    expect(ErrorOf(unknown).type).toBe(ErrorEnum.RANGE_ERROR);
    expect(ErrorOf(unknown).is('RangeError')).toBeTruthy();
  });

  test('Identifies an ReferenceError', () => {
    const unknown = new ReferenceError('unknown');
    expect(ErrorOf(unknown).type).toBe(ErrorEnum.REFERENCE_ERROR);
    expect(ErrorOf(unknown).is('ReferenceError')).toBeTruthy();
  });

  test('Identifies a SyntaxError', () => {
    const unknown = new SyntaxError('unknown');
    expect(ErrorOf(unknown).type).toBe(ErrorEnum.SYNTAX_ERROR);
    expect(ErrorOf(unknown).is('SyntaxError')).toBeTruthy();
  });

  test('Identifies a TypeError', () => {
    const unknown = new TypeError('unknown');
    expect(ErrorOf(unknown).type).toBe(ErrorEnum.TYPE_ERROR);
    expect(ErrorOf(unknown).is('TypeError')).toBeTruthy();
  });

  test('Identifies an URIError', () => {
    const unknown = new URIError('unknown');
    expect(ErrorOf(unknown).type).toBe(ErrorEnum.URI_ERROR);
    expect(ErrorOf(unknown).is('URIError')).toBeTruthy();
  });

  test('Throws an Error if not instance of Error', () => {
    const unknown = new String('Lorem Impum');
    expect(() => ErrorOf(unknown).type).toThrowError();
  });

  test('Throws an Error if not instance of Error', () => {
    const unknown = new Error();
    // @ts-ignore
    expect(() => ErrorOf(unknown).is('String')).toThrowError();
  });
});
