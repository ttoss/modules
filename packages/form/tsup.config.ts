import { tsupConfig } from '@ttoss/config';

export const tsup = tsupConfig({
  noExternal: ['@hookform/resolvers'],
});
