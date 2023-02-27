export function describe(name: string, fn: () => void) {
    console.log(`Running test suite: ${name}`);
    fn();
  }

export function it(name: string, fn: () => void) {
    console.log(`Running test: ${name}`);
    fn();
    }