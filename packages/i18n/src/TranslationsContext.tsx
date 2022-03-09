import React from 'react';

import { MessageFormatElement } from 'react-intl';

export type MessageType =
  | Record<string, string>
  | Record<string, MessageFormatElement[]>;

export type AvailableLanguages = {
  [key: string]: MessageType;
};

type TranslationsContextProps = {
  locale: string;
  // eslint-disable-next-line no-unused-vars
  setLocale: (language: string) => void;
};

export const TranslationsContext =
  React.createContext<TranslationsContextProps>({
    setLocale: () => null,
    locale: '',
  });

type TranslationProviderProps = {
  initialLocale?: string;
};

export const TranslationProvider: React.FC<TranslationProviderProps> = ({
  children,
  initialLocale = 'pt-BR',
}) => {
  const [locale, setLocale] = React.useState(initialLocale);

  const changeLanguage = React.useCallback(
    (language: string) => {
      if (locale !== language) {
        setLocale(language);
      }
    },
    [setLocale, locale]
  );

  return (
    <TranslationsContext.Provider
      value={{
        setLocale: changeLanguage,
        locale,
      }}
    >
      {children}
    </TranslationsContext.Provider>
  );
};

export const useTranslation = () => React.useContext(TranslationsContext);
