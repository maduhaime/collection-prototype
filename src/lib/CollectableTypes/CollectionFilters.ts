export enum NumberCompare {
  EQUALS = '===',
  NOT_EQUALS = '!==',
  LESS_THAN = '<',
  LESS_THAN_OR_EQUALS = '<=',
  GREATER_THAN = '>',
  GREATER_THAN_OR_EQUALS = '>=',
}

export enum StringCompare {
  EQUALS = '===',
  NOT_EQUALS = '!==',
  INCLUDES = 'includes',
  NOT_INCLUDES = 'not-includes',
}

export enum BooleanCompare {
  EQUALS = '===',
  NOT_EQUALS = '!==',
}

export enum DateCompare {
  EQUALS = '===',
  NOT_EQUALS = '!==',
  LESS_THAN = '<',
  LESS_THAN_OR_EQUALS = '<=',
  GREATER_THAN = '>',
  GREATER_THAN_OR_EQUALS = '>=',
}

export function booleanFilter<T, K extends keyof ByType<T, Boolean>>(collection: T[], field: K, oper: BooleanCompare, target: Boolean): T[] {
  return collection.filter((item: T) => {
    console.log('compare :', oper, target, item[field]);

    const source = item[field] as Boolean;
    if (oper === BooleanCompare.EQUALS) return source === target;
    if (oper === BooleanCompare.NOT_EQUALS) return source !== target;
  });
}

export function numberFilter<T, K extends keyof ByType<T, number>>(collection: T[], field: K, oper: NumberCompare, target: number): T[] {
  return collection.filter((item: T) => {
    const source = item[field] as number;
    console.log('numberFilter -> oper :', oper);
    if (oper === NumberCompare.EQUALS) return source === target;
    if (oper === NumberCompare.NOT_EQUALS) return source !== target;
    if (oper === NumberCompare.LESS_THAN) return source < target;
    if (oper === NumberCompare.LESS_THAN_OR_EQUALS) return source <= target;
    if (oper === NumberCompare.GREATER_THAN) return source > target;
    if (oper === NumberCompare.GREATER_THAN_OR_EQUALS) return source >= target;
  });
}

export function stringFilter<T, K extends keyof ByType<T, string>>(collection: T[], field: K, oper: StringCompare, target: string): T[] {
  return collection.filter((item: T) => {
    const source = item[field] as string;
    if (oper === StringCompare.EQUALS) return source === target;
    if (oper === StringCompare.NOT_EQUALS) return source !== target;
    if (oper === StringCompare.INCLUDES) return source.includes(target);
    if (oper === StringCompare.NOT_INCLUDES) return source.includes(target) === false;
  });
}

export function dateFilter<T, K extends keyof ByType<T, Date>>(collection: T[], field: K, oper: DateCompare, target: Date): T[] {
  return collection.filter((item: T) => {
    const source = item[field] as Date;
    if (oper === DateCompare.EQUALS) return source.getTime() === target.getTime();
    if (oper === DateCompare.NOT_EQUALS) return source.getTime() !== target.getTime();
    if (oper === DateCompare.LESS_THAN) return source.getTime() < target.getTime();
    if (oper === DateCompare.LESS_THAN_OR_EQUALS) return source.getTime() <= target.getTime();
    if (oper === DateCompare.GREATER_THAN) return source.getTime() > target.getTime();
    if (oper === DateCompare.GREATER_THAN_OR_EQUALS) return source.getTime() >= target.getTime();
  });
}
