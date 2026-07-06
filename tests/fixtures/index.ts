import { test as base, expect } from '@playwright/test';

type EnvFixtures = {
  requireEnv: (name: string) => string;
};

export const test = base.extend<EnvFixtures>({
  requireEnv: async ({}, use) => {
    await use((name: string) => {
      const value = process.env[name];
      if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
      }
      return value;
    });
  },
});

export { expect };
