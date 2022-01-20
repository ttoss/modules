import { Meta, Story } from '@storybook/react';

import AuthSignUp, {
  AuthSignUpProps,
} from '@ttoss/auth/src/AuthSignUp/AuthSignUp';

export default {
  title: 'Auth/AuthSignUp',
  component: AuthSignUp,
} as Meta;

const Template: Story<AuthSignUpProps> = (args) => <AuthSignUp {...args} />;

export const Example = Template.bind({});
