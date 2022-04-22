import { I18nProvider } from '@ttoss/i18n';
import { NotificationsProvider } from '@ttoss/notifications';
import { ThemeProvider } from '@ttoss/ui';
import { setOptions } from '@ttoss/test-utils';
import React from 'react';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <I18nProvider initialLocale="pt-BR" translations={{}}>
      <ThemeProvider
        theme={{
          colors: {
            primary: '#000',
            secondary: '#fff',
          },
        }}
      >
        <NotificationsProvider>{children}</NotificationsProvider>
      </ThemeProvider>
    </I18nProvider>
  );
};

setOptions({ wrapper: Providers });
