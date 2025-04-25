# TypeScript Playground

A simple TypeScript playground for running TypeScript code via Node.js.

## Project Structure

```
typescript-playground/
├── src/              # TypeScript source files
│   └── index.ts      # Main entry point
├── dist/             # Compiled JavaScript (generated)
├── package.json      # Project dependencies and scripts
└── tsconfig.json     # TypeScript configuration
```

## Setup

1. Install dependencies:

```bash
npm install
```

This will install TypeScript, ts-node, and ts-node-dev.

## Running the Code

There are several ways to run the TypeScript code:

### Run with ts-node (without compiling)

```bash
npm start
```

This uses ts-node to run the TypeScript code directly without a separate compilation step.

### Development Mode (with auto-reload)

```bash
npm run dev
```

This uses ts-node-dev to run the code and automatically restart when files change.

### Compile and Run

```bash
npm run build
node dist/index.js
```

This compiles the TypeScript to JavaScript and then runs the compiled JavaScript.

## Modifying the Playground

To experiment with TypeScript, simply edit the files in the `src` directory. The main entry point is `src/index.ts`.

## Features Demonstrated

The sample code in `src/index.ts` demonstrates:

- TypeScript interfaces and types
- Type annotations for functions
- Generic functions
- Classes with access modifiers
- Type checking
- Basic TypeScript syntax and usage

Feel free to modify and expand upon this code to explore TypeScript's features!
