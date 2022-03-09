import React from 'react';

import { IntlProvider } from 'react-intl';
import {
  useTranslation,
  AvailableLanguages,
  TranslationProvider,
} from './TranslationsContext';

export type I18nProviderProps = {
  initialLocale?: string;
  translations?: AvailableLanguages;
};

const ProviderApp: React.FC<I18nProviderProps> = ({
  children,
  initialLocale,
  translations,
}) => {
  const { locale } = useTranslation();

  return (
    <IntlProvider
      defaultLocale={initialLocale}
      locale={locale}
      messages={translations?.[locale]}
    >
      <>{children}</>
    </IntlProvider>
  );
};

export const I18nProvider: React.FC<I18nProviderProps> = ({
  children,
  initialLocale,
  translations,
}) => {
  return (
    <TranslationProvider initialLocale={initialLocale}>
      <ProviderApp initialLocale={initialLocale} translations={translations}>
        <>{children}</>
      </ProviderApp>
    </TranslationProvider>
  );
};
