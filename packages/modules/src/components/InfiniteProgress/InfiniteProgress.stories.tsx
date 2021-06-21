import React from 'react';
import { Meta } from '@storybook/react';

import InfiniteProgress from './InfiniteProgress';

const AuthSignInComponent: Meta = {
  title: 'Modules Components/InfiniteProgress',
  component: InfiniteProgress,
};

export default AuthSignInComponent;

export const Example = () => <InfiniteProgress />;
