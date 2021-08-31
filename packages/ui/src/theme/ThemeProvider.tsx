import * as React from 'react';

import {
  ThemeProvider as ThemeUiProvider,
  ThemeProviderProps,
} from '@theme-ui/core';

export type { ThemeProviderProps };

import { theme } from './theme';

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return <ThemeUiProvider theme={theme}>{children}</ThemeUiProvider>;
};

export default ThemeProvider;
