import { tsupConfig } from '@ttoss/config';

export const tsup = tsupConfig({
  entry: ['src/index.tsx'],
  minify: false,
  inject: ['./tsup.inject.js'],
});
