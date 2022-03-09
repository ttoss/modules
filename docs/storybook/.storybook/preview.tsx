import { NotificationsProvider } from '@ttoss/notifications/src';
import { ThemeProvider } from '@ttoss/ui';
import AuthProvider from '@ttoss/auth/src/AuthProvider/AuthProvider';

import { useLocale } from 'storybook-addon-locale';

import enUS from '../translations/en-US.json';
import ptBR from '../translations/pt-BR.json';

import { themes } from '../themes';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  defaultLocale: 'pt-BR',
  locales: ['pt-BR', 'en-US'],
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

    const locale = useLocale();

    const translations = {
      'pt-BR': ptBR,
      'en-US': enUS,
    };

    console.log('locale::', locale);

    return (
      <ThemeProvider
        theme={theme}
        fonts={[
          'https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Overlock:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap',
        ]}
      >
        <AuthProvider translations={translations} initialLocale={locale}>
          <NotificationsProvider position="top-right">
            <Story />
          </NotificationsProvider>
        </AuthProvider>
      </ThemeProvider>
    );
  },
];
