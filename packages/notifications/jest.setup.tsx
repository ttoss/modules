import { setOptions } from '@ttoss/test-utils';
import { ThemeProvider } from '@ttoss/ui';
import React from 'react';

import { NotificationsProvider } from './src';

import 'react-toastify/dist/ReactToastify.css';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <NotificationsProvider>{children}</NotificationsProvider>
    </ThemeProvider>
  );
};

setOptions({ wrapper: Providers });
