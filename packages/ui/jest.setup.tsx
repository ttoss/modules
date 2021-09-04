import { setGlobalConfig } from '@ttoss/test-utils/storybook';

/**
 * Add global config to Storybook.
 * https://storybook.js.org/addons/@storybook/testing-react
 */
import * as globalStorybookConfig from './.storybook/preview';

setGlobalConfig(globalStorybookConfig);
