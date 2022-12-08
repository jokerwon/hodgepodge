import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
  },
  resolve: {
    alias: {
      '@jokerwon/shared': resolve(__dirname, 'packages/shared/index.ts'),
      '@jokerwon/utils': resolve(__dirname, 'packages/utils/index.ts'),
    },
  },
});
