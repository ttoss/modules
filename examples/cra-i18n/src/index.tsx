import App from './App';
import { I18nProvider } from '@ttoss/i18n';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@ttoss/ui';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider
      theme={{
        colors: {
          primary: '#127547',
          secondary: '#457F8D',
          text: '#393A3A',
          background: '#F7F9F8',
          accent: '#00C7FE',
          highlight: '#0067D2',
          muted: '#B9B9B9',
        },
      }}
    >
      <I18nProvider>
        <App />
      </I18nProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
