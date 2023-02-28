import { TestResult } from './types.js';
import * as fs from 'fs';
import * as path from 'path';
import * as compiler from './compiler.js';

interface RMTestConfig {
  testMatch: string[];
}

function loadConfig(): RMTestConfig {
  const configPath = path.join(process.cwd(), 'rm-test.config.json');
  const configData = fs.readFileSync(configPath, 'utf8');
  const config = JSON.parse(configData);
  return config;
}

function runTests(testSuites: { name: string, fn: () => void }[]): TestResult[] {
  const results: TestResult[] = [];
  for (const { name, fn } of testSuites) {
    const start = Date.now();
    try {
      fn();
      const end = Date.now();
      results.push({
        name,
        passed: true,
        time: end - start,
        error: null,
      });
    } catch (err) {
      const error = err instanceof Error ? err as Error : new Error("Unknown");
      const end = Date.now();
      results.push({
        name,
        passed: false,
        time: end - start,
        error
      });
    }
  }
  return results;
}

function runTestsInFile(filepath: string): TestResult[] {
  const testModule = require(filepath);
  const testSuites = Object.keys(testModule)
    .filter(key => typeof testModule[key] === 'function')
    .map(key => ({ name: key, fn: testModule[key] }));

  return runTests(testSuites);
}

function findTestFiles(dir: string, testMatch: string[]): string[] {
  const files = fs.readdirSync(dir);
  const testFiles = files.filter(file => {
    return testMatch.some(pattern => {
      const regexp = new RegExp(pattern);
      return regexp.test(file);
    });
  });
  const testFilePaths = testFiles.map(file => path.join(dir, file));
  return testFilePaths;
}

function runTestsInDirectory(dir: string, testMatch: string[]): TestResult[] {
  const testFilePaths = findTestFiles(dir, testMatch);
  const testResults = testFilePaths.flatMap(runTestsInFile);
  return testResults;
}

export function runAllTests() {
  compiler.compileSource();
  const config = loadConfig();
  const rootDir = path.resolve('.');
  const testResults = runTestsInDirectory(rootDir, config.testMatch);
  return testResults;
}