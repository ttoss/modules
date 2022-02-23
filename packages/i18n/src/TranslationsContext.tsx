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
  selectedLanguage?: MessageType | undefined;
  changeLanguage: (language: string) => void;
};

export const TranslationsContext =
  React.createContext<TranslationsContextProps>({
    changeLanguage: () => null,
    locale: '',
  });

type TranslationProviderProps = {
  initialLocale: string;
  translations: AvailableLanguages;
};

export const TranslationProvider: React.FC<TranslationProviderProps> = ({
  children,
  initialLocale,
  translations,
}) => {
  const [selectedLanguage, setSelectedLanguage] = React.useState<
    MessageType | undefined
  >(translations?.[initialLocale]);
  const [locale, setLocale] = React.useState(initialLocale);

  const changeLanguage = React.useCallback(
    (language: string) => {
      if (translations && !!translations[language]) {
        setSelectedLanguage(translations[language]);
        setLocale(language);
      }
    },
    [translations, setSelectedLanguage, setLocale]
  );

  return (
    <TranslationsContext.Provider
      value={{
        selectedLanguage,
        changeLanguage,
        locale,
      }}
    >
      {children}
    </TranslationsContext.Provider>
  );
};

export const useTranslation = () => React.useContext(TranslationsContext);
