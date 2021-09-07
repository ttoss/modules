import React from 'react';
import ReactDOM from 'react-dom';

import { GoogleMapsProvider } from '@ttoss/google-maps';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <GoogleMapsProvider apiKey="AIzaSyBN3uTF9NjptxEwR9swpQFn6LRZpiqsC04">
      <App />
    </GoogleMapsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
