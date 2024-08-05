export const fnRegExp = /(?<fnName>\w+)\((?<fnArgs>.*)\)/;

export const argsRegExp = /([^,]+)/g;

export const chainSplitter = '|';

export type SupportedArgs = (string | number | Date)[];
