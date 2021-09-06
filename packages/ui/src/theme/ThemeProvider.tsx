// import * as React from 'react';

import { ThemeProvider as ThemeUiProvider, Theme } from '@theme-ui/core';

import { theme } from './theme';

export type ThemeProviderProps = {
  theme?: Theme | ((outerTheme: Theme) => Theme);
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return <ThemeUiProvider theme={theme}>{children}</ThemeUiProvider>;
};

export default ThemeProvider;
