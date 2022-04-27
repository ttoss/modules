import { jestConfig } from '@ttoss/config';

const config = jestConfig({
  setupFilesAfterEnv: ['./jest.setup.tsx'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    /**
     * Avoid error:
     * /hdd1T/oss/ttoss/modules/node_modules/@aws-sdk/client-location/node_modules/uuid/dist/esm-browser/index.js:1
     * SyntaxError: Unexpected token 'export'
     */
    uuid: '<rootDi/../../node_modules/uuid/index.js',
  },
});

export default config;
