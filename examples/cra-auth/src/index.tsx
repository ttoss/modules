import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { AuthProvider } from '@ttoss/auth';
import { ThemeProvider } from '@ttoss/ui';
import Amplify from 'aws-amplify';

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
      <AuthProvider>
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
