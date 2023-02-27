export class AssertionError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'AssertionError';
    }
  }
  
  export class TypeError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'TypeError';
    }
  }


export const equal = (actual: any, expected: any) => {
      if (actual !== expected) {
        throw new AssertionError(`Expected ${actual} to equal ${expected}`);
      }
    }
  
    export const notEqual = (actual: any, expected: any) => {
      if (actual === expected) {
        throw new AssertionError(`Expected ${actual} not to equal ${expected}`);
      }
    }
  
   export const isTrue = (actual: boolean) => {
      if (actual !== true) {
        throw new AssertionError(`Expected ${actual} to be true`);
      }
    }
  
    export const isFalse = (actual: boolean) => {
      if (actual !== false) {
        throw new AssertionError(`Expected ${actual} to be false`);
      }
    }
