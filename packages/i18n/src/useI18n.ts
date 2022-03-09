import { useIntl } from 'react-intl';

import { useTranslation } from './TranslationsContext';

export const useI18n = () => {
  const intl = useIntl();
  const { locale, setLocale } = useTranslation();

  return {
    intl,
    locale,
    setLocale,
  };
};
