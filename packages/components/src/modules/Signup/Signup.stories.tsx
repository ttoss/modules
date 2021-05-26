import React from 'react';
import { Meta } from '@storybook/react';

import Signup from './Signup';

const SignupComponent: Meta = {
  title: 'Modules Checkout/Signup',
  component: Signup,
};

const Example = () => (
  <Signup onSubmit={(data) => alert(JSON.stringify(data))} />
);

export default SignupComponent;

export { Example };
