import { NotificationsProvider } from '@ttoss/notifications';
import { ThemeProvider } from '@ttoss/ui';

import { themes } from '../themes';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'Triangulos',
    toolbar: {
      icon: 'circlehollow',
      items: Object.keys(themes),
      showName: true,
    },
  },
};

export const decorators = [
  (Story, context) => {
    const theme = themes[context.globals.theme];

    return (
      <ThemeProvider theme={theme}>
        <NotificationsProvider>
          <Story />
        </NotificationsProvider>
      </ThemeProvider>
    );
  },
];
