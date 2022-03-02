import { tsupConfig } from '@ttoss/config';

export const tsup = tsupConfig({
  entry: ['src/index.ts'],
  minify: false,
  inject: ['./tsup.inject.js'],
});
