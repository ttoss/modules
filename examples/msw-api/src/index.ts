/* eslint-disable @typescript-eslint/no-var-requires */
import { handlers } from './mocks/handler';

if (typeof window === 'undefined') {
  const { setupServer } = require('msw/node');
  const server = setupServer(...handlers);
  server.listen();
} else {
  const { setupWorker } = require('msw');
  const worker = setupWorker(...handlers);
  worker.start();
}
