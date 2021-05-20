import { Meta } from '@storybook/react';

import Login from './Login';

const LoginComponent: Meta = {
  title: 'Modules Checkout/Login',
  component: Login,
};

const Example = () => (
  <Login
    onSubmit={(email, password) =>
      alert(`Email: ${email} |  Password: ${password} `)
    }
  />
);

export default LoginComponent;

export { Example };
