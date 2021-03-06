import { Global, css } from '@emotion/react';
import { ThemeProvider as ThemeUiProvider, Theme, merge } from '@theme-ui/core';
import * as React from 'react';

import { defaultFonts } from './defaultFonts';
import { defaultTheme } from './defaultTheme';

export type ThemeProviderProps = {
  children?: React.ReactNode;
  theme?: Theme;
  /**
   * Fonts URLs.
   */
  fonts?: string[];
};

const ThemeProvider = ({
  children,
  theme = {},
  fonts = defaultFonts,
}: ThemeProviderProps) => {
  const mergedTheme = React.useMemo(() => {
    if (typeof theme === 'function') {
      return theme;
    }

    return merge(defaultTheme, theme);
  }, [theme]);

  return (
    <>
      <ThemeUiProvider theme={mergedTheme}>
        {fonts.map((url) => (
          <Global
            key={url}
            styles={css`
              @import url('${url}');
            `}
          />
        ))}
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
