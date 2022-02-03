import { Global } from '@emotion/react';
import { ThemeProvider as ThemeUiProvider, Theme, merge } from '@theme-ui/core';
import * as React from 'react';

import { defaultTheme } from './defaultTheme';

export type ThemeProviderProps = {
  children?: React.ReactNode;
  theme?: Theme;
};

const ThemeProvider = ({ children, theme = {} }: ThemeProviderProps) => {
  const mergedTheme = React.useMemo(() => {
    if (typeof theme === 'function') {
      return theme;
    }

    return merge(defaultTheme, theme);
  }, [theme]);

  return (
    <>
      <ThemeUiProvider theme={mergedTheme}>
        <Global
          styles={{
            '*': {
              margin: 0,
            },
          }}
        />
        {children}
      </ThemeUiProvider>
    </>
  );
};

export default ThemeProvider;
