import React from 'react';

import { IntlProvider } from 'react-intl';
import {
  useTranslation,
  AvailableLanguages,
  TranslationProvider,
} from './TranslationsContext';

export type I18nProviderProps = {
  initialLocale: string;
  translations: AvailableLanguages;
};

const ProviderApp: React.FC<{ initialLocale?: string }> = ({
  children,
  initialLocale,
}) => {
  const { selectedLanguage, locale } = useTranslation();

  return (
    <IntlProvider
      defaultLocale={initialLocale}
      locale={locale}
      messages={selectedLanguage}
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
  if (!translations) {
    return null;
  }

  return (
    <TranslationProvider
      initialLocale={initialLocale}
      translations={translations}
    >
      <ProviderApp initialLocale={initialLocale}>
        <>{children}</>
      </ProviderApp>
    </TranslationProvider>
  );
};
