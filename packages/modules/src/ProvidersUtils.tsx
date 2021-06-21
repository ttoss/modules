import * as React from 'react';

import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'theme-ui';

const theme = {
  colors: {
    background: '#FFF',
    text: '#444',
  },
};

const Providers: React.FC = ({ children }) => {
  return (
    <IntlProvider locale="en">
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </IntlProvider>
  );
};

export default Providers;
