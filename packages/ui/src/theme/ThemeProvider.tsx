import * as React from 'react';

import {
  ThemeProvider as ThemeUiProvider,
  ThemeProviderProps,
} from '@theme-ui/core';

import { theme } from './theme';

export type { ThemeProviderProps };

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return <ThemeUiProvider theme={theme}>{children}</ThemeUiProvider>;
};

export default ThemeProvider;
