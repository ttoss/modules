import React from 'react';

import { IntlProvider } from 'react-intl';
import {
  useTranslation,
  AvailableLanguages,
  TranslationProvider,
} from './TranslationsContext';

export type ProviderProps = {
  initialLocale: string;
  translations: AvailableLanguages;
};

const ProviderApp: React.FC<ProviderProps> = ({
  translations,
  children,
  initialLocale,
}) => {
  const { setInitialLanguages, selectedLanguage, locale, changeLanguage } =
    useTranslation();

  React.useEffect(() => {
    if (translations) {
      setInitialLanguages(translations);
    }
    // eslint-disable-next-line react-app/react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (initialLocale) {
      changeLanguage(initialLocale);
    }
    // eslint-disable-next-line react-app/react-hooks/exhaustive-deps
  }, [initialLocale]);

  return (
    <IntlProvider locale={locale} messages={selectedLanguage}>
      <>{children}</>
    </IntlProvider>
  );
};

export const Provider: React.FC<ProviderProps> = ({
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
