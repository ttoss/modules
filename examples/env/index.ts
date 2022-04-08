let config;

try {
  config = require('./config.json');
} catch (e) {
  config = {};
}

export const env = {
  GOOGLE_MAPS_API_KEY: '',
  ...config,
};
