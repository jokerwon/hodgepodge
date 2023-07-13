import { defineConfig } from 'tsup';

const commonConfig = defineConfig({
  format: ['cjs', 'esm'],
  bundle: true,
  splitting: true,
  dts: true,
  shims: true,
  clean: true,
  treeshake: true,
});

export default defineConfig([
  {
    ...commonConfig,
    entry: ['packages/cli/src/index.ts'],
    outDir: 'packages/cli/dist',
  },
  {
    ...commonConfig,
    entry: ['packages/shared/index.ts'],
    outDir: 'packages/shared/dist',
  },
  {
    ...commonConfig,
    entry: ['packages/utils/index.ts'],
    outDir: 'packages/utils/dist',
  },
]);
