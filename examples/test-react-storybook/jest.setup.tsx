import { setOptions, setStorybookGlobalConfig } from '@ttoss/test-utils';
import * as React from 'react';

/**
 * Add global config to Storybook.
 * https://storybook.js.org/addons/@storybook/testing-react
 */
import * as globalStorybookConfig from './.storybook/preview';

setStorybookGlobalConfig(globalStorybookConfig);

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

setOptions({ wrapper: JestSetupProvider });
