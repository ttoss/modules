import { setWrapper } from '@ttoss/test-utils';
import { setGlobalConfig } from '@ttoss/test-utils/storybook';
import * as React from 'react';

/**
 * Add global config to Storybook.
 * https://storybook.js.org/addons/@storybook/testing-react
 */
import * as globalStorybookConfig from './.storybook/preview';

setGlobalConfig(globalStorybookConfig);

/**
 * Add global wrapper to React Testing Library `customRender`.
 */
const JestSetupProvider: React.FC = ({ children }) => {
  return (
    <div>
      <span>JestSetupProvider</span>
      {children}
    </div>
  );
};

setWrapper(JestSetupProvider);
