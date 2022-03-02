import { setOptions } from '@ttoss/test-utils';
import React from 'react';

import { I18nProvider } from './src';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <I18nProvider initialLocale="pt-BR" translations={{}}>
      {children}
    </I18nProvider>
  );
};

setOptions({ wrapper: Providers });
