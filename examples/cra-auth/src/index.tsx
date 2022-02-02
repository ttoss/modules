import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';

import { AuthProvider } from '@ttoss/auth';
import { ThemeProvider } from '@ttoss/ui';
import { Amplify } from 'aws-amplify';

import { translations } from './locale';

Amplify.configure({
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_jCBebwqkA',
    userPoolWebClientId: '5qpkd3tpql92qrr4j0d1n3h6nm',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider
      theme={{
        colors: {
          transparent: '#ffffff00',
          primary: '#127547',
          secondary: '#457F8D',
          text: '#393A3A',
          background: '#F7F9F8',
          accent: '#00C7FE',
          highlight: '#0067D2',
          muted: '#B9B9B9',
          primaryVariant: '#008774',
          secondaryVariant: '#7AB4C3',
          alert: '#FF655B',
          success: '#66AA00',
          caution: '#FC6C00',
          neutral: '#888888',
          eucalipto: '#E79E49',
          pinus: '#EBC36D',
          cedroAustraliano: '#9F4F2A',
          mognoAfricano: '#C18771',
          teca: '#C19358',
        },
      }}
    >
      <AuthProvider translations={translations} initialLocale="pt-BR">
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
