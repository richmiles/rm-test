
import * as assert from '../src/assertion';
import { describe, it } from '../src/utils';

function add(a: number, b: number): number {
  return a + b;
}

describe('add', () => {
  it('should add two numbers', () => {
    const result = add(2, 3);
    assert.equal(result, 5);
  });
});

