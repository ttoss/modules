import { jestConfig } from '@ttoss/config';

const config = jestConfig({
  setupFilesAfterEnv: ['./jest.setup.tsx'],
  testEnvironment: 'jsdom',
  timers: 'fake',
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
  },
});

export default config;
