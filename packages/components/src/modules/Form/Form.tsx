import * as React from 'react';

import { Box, Label, Text } from '@theme-ui/components';

type FormControlProps = {
  children: React.ReactNode | React.ReactNodeArray;
  label: string;
  name: string;
  errorMessage?: string;
};

const FormControl = ({
  children,
  label,
  name,
  errorMessage,
}: FormControlProps) => {
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

const FormItem = ({ children }: { children: React.ReactNode }) => {
  return <Box>{children}</Box>;
};

Form.Item = FormItem;
Form.FormControl = FormControl;

export default Form;
