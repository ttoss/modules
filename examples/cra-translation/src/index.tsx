import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ThemeProvider } from '@ttoss/ui';
import { Provider } from '@ttoss/i18n';

const translations = {
  'en-US': {
    hello: 'Hello!',
    congratulations: 'Congratulations',
    welcome: 'Welcome {name}',
  },
  'pt-BR': {
    hello: 'Olá!',
    congratulations: 'Parabéns',
    welcome: 'Seja Bem vindo {name}',
  },
};

ReactDOM.render(
  <React.StrictMode>
    <Provider initialLocale="en-US" translations={translations}>
      <ThemeProvider
        theme={{
          text: {
            title: {
              color: 'red',
            },
          },
          cards: {
            primary: {
              padding: 2,
              borderRadius: 4,
              boxShadow: '0 0 8px rgba(0, 0, 0, 0.125)',
            },
            compact: {
              padding: 4,
              borderRadius: 2,
              border: '20px solid',
              borderColor: 'muted',
            },
          },
        }}
      >
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
