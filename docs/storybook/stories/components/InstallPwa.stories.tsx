import { Story, Meta } from '@storybook/react';

import {
  InstallPwaUi,
  InstallPwaUiProps,
} from '@ttoss/components/src/components/InstallPwa/InstallPwaUi';

export default {
  title: 'Components/InstallPwaUi',
  component: InstallPwaUi,
} as Meta;

const Template: Story<InstallPwaUiProps> = (args) => <InstallPwaUi {...args} />;

export const Example = Template.bind({});
