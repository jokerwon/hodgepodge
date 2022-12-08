import { describe, it, expect } from 'vitest';
import { omit } from '.';

describe('omit', () => {
  it('should return self', () => {
    const obj = { bar: 'bar', foo: 'foo' };
    expect(omit(obj)).toStrictEqual({ bar: 'bar', foo: 'foo' });
  });

  it('should not have foo', () => {
    const obj = { bar: 'bar', foo: 'foo' };
    expect(omit(obj, ['foo'])).toStrictEqual({ bar: 'bar' });
  });

  it('should not have foo and clazz recursive', () => {
    const obj = {
      foo: 'foo',
      bar: {
        foo: 'foo',
        clazz: 'clazz',
        more: {
          foo: {
            deeper: 'deeper',
          },
          extra: 'extra',
        },
      },
    };
    expect(omit(obj, ['foo', 'clazz'])).toStrictEqual({
      bar: {
        more: {
          extra: 'extra',
        },
      },
    });
  });
});
