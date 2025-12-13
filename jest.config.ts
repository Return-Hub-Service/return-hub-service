/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";

const config: Config = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", // Map @/ to the root folder
  },
  preset: "ts-jest",
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  testMatch: [
    "<rootDir>/src/test/unit-tests/**/*.test.ts",
    "<rootDir>/src/test/unit-tests/**/*.test.tsx",
  ],
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  coveragePathIgnorePatterns: ["/node_modules/", "/.next/", "/coverage/"],
};

export default config;
