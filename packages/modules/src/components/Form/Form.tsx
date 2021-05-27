import * as React from 'react';

import { Box, Label, Text } from '@theme-ui/components';

type FormItemProps = {
  children: React.ReactNode | React.ReactNodeArray;
  label: string;
  name: string;
  errorMessage?: string;
};

const FormItem = ({ children, label, name, errorMessage }: FormItemProps) => {
  return (
    <Box sx={{ width: '100%', marginBottom: '24px' }}>
      <Label htmlFor={name}>{label}</Label>
      {children}

      {errorMessage && (
        <Text sx={{ fontSize: '12px', color: 'red' }}>{errorMessage}</Text>
      )}
    </Box>
  );
};

const Form = (
  props: React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  >
) => {
  return <form {...props} />;
};

Form.FormItem = FormItem;

export default Form;
