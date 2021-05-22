import React from 'react';
import { Meta } from '@storybook/react';

import Login from './Login';

const LoginComponent: Meta = {
  title: 'Modules Checkout/Login',
  component: Login,
};

const Example = () => (
  <Login onSubmit={(data) => alert(JSON.stringify(data))} />
);

export default LoginComponent;

export { Example };
