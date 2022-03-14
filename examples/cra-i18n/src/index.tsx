import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';

import { I18nProvider } from '@ttoss/i18n/src';
import { ThemeProvider } from '@ttoss/ui';

// import ptBR from './lang/pt-BR.json';
// import enUS from './lang/en-US.json';

// const translations = {
//   'pt-BR': ptBR,
//   'en-US': enUS,
// };

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
