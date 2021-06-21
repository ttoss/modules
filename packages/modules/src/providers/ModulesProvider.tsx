import * as React from 'react';

import { Theme, ThemeProvider } from 'theme-ui';

import NotificationsProvider from '../modules/notifications/NotificationsProvider';

const ModulesProvider: React.FC<{ theme?: Theme }> = ({
  children,
  theme = {},
}) => {
  return (
    <ThemeProvider theme={theme}>
      <NotificationsProvider>{children}</NotificationsProvider>
    </ThemeProvider>
  );
};

export default ModulesProvider;
