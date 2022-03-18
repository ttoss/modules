import { Amplify } from 'aws-amplify';
import App from './App';
import { AuthProvider } from '@ttoss/auth';
import { I18nProvider } from '@ttoss/i18n';
import { NotificationsProvider } from '@ttoss/notifications';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@ttoss/ui';

import reportWebVitals from './reportWebVitals';

Amplify.configure({
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_jCBebwqkA',
    userPoolWebClientId: '5qpkd3tpql92qrr4j0d1n3h6nm',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <I18nProvider>
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
        <NotificationsProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </NotificationsProvider>
      </ThemeProvider>
    </I18nProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
