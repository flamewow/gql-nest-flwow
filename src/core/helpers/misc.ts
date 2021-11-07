import * as fs from 'fs';

export const file2String = (path) => {
  const buffer = fs.readFileSync(path);
  return buffer.toString();
};

const randomString = (length: number, chars: string): string => {
  let result = '';
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

export const randomString_azAZ09 = (length: number): string => randomString(length, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

export const getEnumList = (enumName: any): string[] => {
  return Object.keys(enumName).filter((k) => typeof enumName[k as any] === 'number');
};

export const plainEnumToString = (type: any, enumType: any): string => enumType[type];

export const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
};

export const sequenceGenerator = function* (): Generator<number> {
  let index = 0;
  while (true) {
    yield index++;
  }
};

export const getExtension = (value: string): string => {
  const arr = value.split('.');
  return arr[arr.length - 1];
};

export const parseBoolean = (string: string): boolean => {
  switch (string?.toLowerCase()?.trim()) {
    case 'true':
    case 'yes':
    case '1':
      return true;
    case 'false':
    case 'no':
    case '0':
    case null:
      return false;
    default:
      return Boolean(string);
  }
};

export const getCode = (): number => {
  return Math.floor(Math.random() * 899999 + 100000);
};
