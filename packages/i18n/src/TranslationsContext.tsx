import React from 'react';

import { MessageFormatElement } from 'react-intl';

export type MessageType =
  | Record<string, string>
  | Record<string, MessageFormatElement[]>;

export type AvailableLanguages = {
  [key: string]: MessageType;
};
type TranslationsContextProps = {
  availableLanguages?: AvailableLanguages;
  locale: string;
  selectedLanguage?: MessageType | undefined;
  changeLanguage: (language: string) => void;
  setInitialLanguages: (languages: AvailableLanguages) => void;
};

export const TranslationsContext = React.createContext<TranslationsContextProps>(
  {
    availableLanguages: undefined,
    selectedLanguage: undefined,
    changeLanguage: () => null,
    setInitialLanguages: () => null,
    locale: '',
  }
);

type TranslationProviderProps = {
  initialLocale: string;
};

export const TranslationProvider: React.FC<TranslationProviderProps> = ({
  children,
  initialLocale,
}) => {
  const [availableLanguages, setAvailableLanguages] = React.useState<
    AvailableLanguages | undefined
  >();
  const [selectedLanguage, setSelectedLanguage] = React.useState<
    MessageType | undefined
  >();
  const [locale, setLocale] = React.useState(initialLocale);

  const changeLanguage = (language: string) => {
    if (availableLanguages && !!availableLanguages[language]) {
      setSelectedLanguage(availableLanguages[language]);
      setLocale(language);
    }
  };

  const setInitialLanguages = (languages: AvailableLanguages) => {
    setAvailableLanguages(languages);
  };

  return (
    <TranslationsContext.Provider
      value={{
        selectedLanguage,
        availableLanguages,
        changeLanguage,
        setInitialLanguages,
        locale,
      }}
    >
      {children}
    </TranslationsContext.Provider>
  );
};

export const useTranslation = () => React.useContext(TranslationsContext);
