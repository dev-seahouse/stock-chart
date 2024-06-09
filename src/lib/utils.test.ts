import { describe, expect, it, test } from 'vitest';
import { capitalize, cn } from './utils';

describe('capitalize', () => {
  it('should capitalize the first letter', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('should work with a single char ', () => {
    expect(capitalize('a')).toBe('A');
  });

  it('should return an empty string if input is empty str', () => {
    expect(capitalize('')).toBe('');
  });
});

describe('cn', () => {
  test('should merge classNames', () => {
    const result = cn('text-red-500', 'bg-blue-500');
    expect(result).toBe('text-red-500 bg-blue-500');
  });

  test('should override same category tw className', () => {
    // eslint-disable-next-line tailwindcss/no-contradicting-classname
    const result = cn('p-4', 'p-8');
    expect(result).toBe('p-8');
  });
});
