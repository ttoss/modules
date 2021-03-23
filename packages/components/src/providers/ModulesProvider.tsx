import * as React from 'react';

import { IntlProvider } from 'react-intl';
import { ThemeProvider, Theme } from 'theme-ui';

const ModulesProvider: React.FC<{ theme?: Theme }> = ({
  children,
  theme = {},
}) => {
  return (
    <IntlProvider locale="en">
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </IntlProvider>
  );
};

export default ModulesProvider;
