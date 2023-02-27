export interface Test {
    name: string;
    fn: () => Promise<void> | void;
  }

  export interface TestResult {
    name: string;
    passed: boolean;
    time: number;
    error: Error | null;
  }
  