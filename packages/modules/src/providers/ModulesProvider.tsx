import * as React from 'react';

import { IntlProvider } from 'react-intl';
import { ThemeProvider, Theme } from 'theme-ui';

import themeDefault from '../Theme/theme';

const ModulesProvider: React.FC<{ theme?: Theme }> = ({
  children,
  theme = themeDefault,
}) => {
  return (
    <IntlProvider locale="en">
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </IntlProvider>
  );
};

export default ModulesProvider;
