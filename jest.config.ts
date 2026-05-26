import type { Config } from "jest";
import nextJest from "next/jest.js";

// Tells Next.js where the app lives so it can load next.config and .env files
const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  // Runs after Jest sets up jsdom but before tests — extends `expect` with
  // matchers like `toBeInTheDocument`, `toHaveAttribute`, etc.
  // (Note: the option name is `setupFilesAfterEnv` — "after the env is set up" —
  // not `setupFilesAfterEach`, which is a common typo.)
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // jsdom = simulated browser. Required for any test that touches the DOM
  // (components, hooks that use useEffect, anything from RTL).
  testEnvironment: "jsdom",

  // Where Jest should look for tests. Co-locating __tests__ folders next to
  // source is the convention I'd recommend — keeps tests near the code.
  testMatch: [
    "**/__tests__/**/*.test.[jt]s?(x)",
    "**/?(*.)+(test).[jt]s?(x)",
  ],

  // Skip these — node_modules is obvious; .next is Next's build output.
  testPathIgnorePatterns: ["/node_modules/", "/.next/", "/e2e/"],

  // Path alias must mirror tsconfig.json's "paths" config.
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

// next/jest wraps your config with SWC-based transform setup. Always export
// the wrapped version, not the raw config.
export default createJestConfig(config);
