## File conventions

- File names should be kebab case.
- Keep files in thematically organized directories.
- Avoid using index files - typically import target file directly.
- Import files using the extension '.js' even for Typescript files.

## Code Style

- Avoid using ES6 classes or classes in general (except where otherwise noted).
- Generlaly use TypeScript aliases for type definitions rather than interfaces - i.e. prefer `type Foo = {x: number}`.
- Implement interfaces using plain objects and functions, not class instances.
- Prefer functional programming patterns over object-oriented patterns.
- Use individual `export` declarations on each value rather than a single export statement at the end.
- Never use `any` as a type in Typescript.

## Export Patterns

### Default Rule: Use Named Exports

Use named exports for all code. Default exports are only allowed where required by frameworks (Next.js pages/layouts, Storybook story metadata, config files).

### ESLint Enforcement

This convention is enforced through ESLint rules that:
- Ban default exports by default (`import/no-default-export: error`)
- Allow exceptions only for specific file patterns (components, Next.js pages, Storybook)
- Ensure consistent naming across the codebase

## Function argument conventions

**NOTE:** The following guidelines do not apply to all code. It applies to general application code, but lower level services may not need to follow these guidelines - retain consistency with the rest of the file/directory if unsure.

Functions should generally take their arguments as a single object called `args`. The type of `args` should be defined inline, without using destructuring. Args can be referred to through the `args` parameter. E.g.

```typescript
const foo = (args: {
  x: number,
  y: string
}) => {
  console.log(`Received ${args.x} lots of ${args.y}`);
}
```
**Note:** The guidance below is specifically about the properties of the `args` parameter - it doesn't apply to how those child values are themselves constructed.

When calling another function that takes an `args` object, explicitly initialize the values - don't try to pass through `args` directly even if the properties match the desired args. E.g.:

Good:

```typescript
const foo = (args: {
  x: number,
  y: string
}) => {
  bar({x: args.x}); // GOOD: Explicitly specify the args.
}

const bar = (args: {
  x: number
}) => {
  console.log(`Received ${args.x}`);
}
```

Bad:

```typescript
const foo = (args: {
  x: number,
  y: string
}) => {
  bar(args); // BAD: Rely on shared structure.
}

const bar = (args: {
  x: number
}) => {
  console.log(`Received ${args.x}`);
}
```

**Rationale:** Passing through an object with more properties than are required can lead to bugs where an optional parameter unexpected receives a value at runtime which may not match the function's expectations, e.g.:

### Services

One special argument is the `services` argument. This argument contains objects or services that are shared throughout the app, and created at app startup, including things like:

- loggers
- secret management
- database objects
- network clients

that functions may need. Each function should explicitly specify the services that it, or any functions that it calls, need. 

The conventions for this parameter are as follows:

- It should only be constructed at app startup (this doesn't apply to tests).
- Typical application code from then on should not modify or copy the `services` object - it should be passed through as is.
- If a function needs to call another function but the `services` parameter is missing a service, then the caller needs to add that service to its signature so that its parent will pass it in, rather than trying to add a new service to the bundle via spread operator or by mutation.

Example:

```typescript
const passesThroughServices(args: {
    services: {logger: Logger, database: Database}
  }) => {
  return loadFromDataBase({services}); // GOOD
}

const doesntHaveRequiredServices(args: {
    services: {database: Database}
  }) => {
  return loadFromDataBase({
    services: {
      ...args.services,
      logger: (message) => console.log(message)
    } // BAD - should just be using the services we are given.
  });
}

const loadFromDatabase = (args: {
    services: {logger: Logger, database: Database}
  }) => {
  //...
}
```

## Method Syntax Convention

- Use arrow syntax for all method definitions in interfaces and type definitions.
- Use arrow syntax for all method implementations in objects.
- This ensures contravariant parameter checking for better type safety with `strictFunctionTypes`.

**Preferred:**
```typescript
interface Store {
  getItem: (id: string) => Item | undefined;
  setItem: (id: string, item: Item) => void;
}

const store: Store = {
  getItem: (id) => { /* implementation */ },
  setItem: (id, item) => { /* implementation */ }
};
```

**Avoid:**
```typescript
interface Store {
  getItem(id: string): Item | undefined;
  setItem(id: string, item: Item): void;
}

const store: Store = {
  getItem(id) { /* implementation */ },
  setItem(id, item) { /* implementation */ }
};
```

## Naming Conventions

- Functions should be named `create...` only when they have side effects (e.g., writing to database, creating files).
- Functions that create new object instances in memory should be named `...With` (e.g., `moduleWith()` not `createModule()`).
- When creating a new object with internal state where object identity matters, use `new...` (e.g., `newFModuleStore()` creates a fresh store instance with its own internal state).
- Reserve `create...` for operations that persist or have external effects.

## Persistent Data Records

Files containing persistent data record types use the `.record.ts` extension to clearly identify them as containing data structures that are persisted to storage.

- **Naming**: Use `<name>.record.ts` for files containing persistent data types
- **Purpose**: These files define interfaces/types for data that is persisted
- **Caution**: Changes to these types can break data compatibility - see warning comments in files
- **Examples**: `module-record.record.ts` contains the `ModuleRecord` interface

This convention prepares for future tooling that can detect breaking changes in persistent data structures.

### Test Data Organization

- **Define test data in the test where it's used** - Avoid shared test fixtures at the describe level. Each test should define its own data to be self-contained and easier to understand.
- **Use helper functions to reduce clutter** - When test data becomes repetitive, create helper functions (e.g., `testQuestionWith()`) that take parameters for the varying parts.
- **Include mock functions in this pattern** - Mock functions should also be defined within individual tests rather than shared, unless they're truly reusable across all tests.

```typescript
// ✅ DO: Self-contained test with its own data
it("handles user answer and advances to next question", async () => {
  const testQuestion = testQuestionWith({ text: "What is React?" });
  const updatedQuestion = testQuestionWith({ 
    text: "What is React?", 
    correctAnswers: 1 
  });
  const mockCallback = jest.fn().mockResolvedValue(undefined);
  
  // Test implementation...
});

// ❌ DON'T: Shared fixtures at describe level
describe("QuizSession", () => {
  const testQuestion = { /* large object */ };
  const mockCallback = jest.fn();
  
  beforeEach(() => {
    mockCallback.mockClear();
  });
  
  it("test that uses testQuestion and mockCallback", () => {
    // Hard to understand what data this test actually needs
  });
});
```

## Change complete checklist

To ensure code is consistent and to check for errors after any changes:

- Regenerate schemas using `pnpm generate-schemas` if any schema files changed.
- Check code compiles using `pnpm tsc`.
- Format code using `pnpm pretty`.
- Run lint using `pnpm lint`.
- Run tests using `pnpm test`.

## Docs

Information on particular topics can be found in the `docs/` directory - see `docs/README.md` for a listing.