import * as React from 'react';

import { Box } from '@theme-ui/components';

const Form = (
  props: React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  >
) => {
  return <form {...props} />;
};

const FormItem = ({ children }: { children: React.ReactNode }) => {
  return <Box>{children}</Box>;
};

Form.Item = FormItem;

export default Form;
