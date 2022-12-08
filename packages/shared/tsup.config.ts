import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts'],
  bundle: true,
  splitting: true,
  outDir: 'dist',
  format: ['cjs', 'esm'],
  dts: true,
  shims: true,
});
