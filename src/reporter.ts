import { TestResult } from './types.js';

export class TestReporter {
  report(results: TestResult[]) {
    const passed = results.filter((result) => result.passed);
    const failed = results.filter((result) => !result.passed);

    console.log(`Total tests: ${results.length}`);
    console.log(`Passed: ${passed.length}`);
    console.log(`Failed: ${failed.length}`);

    failed.forEach((result) => {
      console.log(`Failed test: ${result.name}`);
      console.log(`Error: ${result.error}`);
    });
  }
}
