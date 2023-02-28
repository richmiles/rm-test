import * as ts from 'typescript';

// Load the tsconfig.json file and parse its contents
const configFile = ts.readConfigFile('tsconfig.json', ts.sys.readFile);
const compilerOptions = ts.parseJsonConfigFileContent(
  configFile.config,
  ts.sys,
  process.cwd()
).options;
const fileNames = configFile.config.files;

// Create a compiler host using the default methods
const compilerHost = ts.createCompilerHost(compilerOptions);

// Create a program using the compiler options and file list
const program = ts.createProgram(fileNames, compilerOptions, compilerHost);

// Emit the compiled JavaScript code
const emitResult = program.emit();

// Check for errors
const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
if (allDiagnostics.length > 0) {
  console.error(ts.formatDiagnosticsWithColorAndContext(allDiagnostics, compilerHost));
  process.exit(1);
}
