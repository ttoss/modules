import { setOptions } from '@ttoss/test-utils';
import { ThemeProvider } from '@ttoss/ui';
import React from 'react';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      theme={{
        colors: {
          primary: '#000',
          secondary: '#fff',
        },
      }}
    >
      {children}
    </ThemeProvider>
  );
};

setOptions({ wrapper: Providers });
