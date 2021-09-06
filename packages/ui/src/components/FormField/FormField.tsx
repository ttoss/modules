import * as React from 'react';

import Box from '../Box/Box';
import Label from '../Label/Label';
import Text from '../Text/Text';

export type FormFieldProps = {
  children?: React.ReactNode;
  label?: string;
  error?: string[] | string;
};

const FormField = ({ children, label, error }: FormFieldProps) => {
  const errorAsArray = (() => {
    if (Array.isArray(error)) {
      return error;
    }

    if (typeof error === 'string') {
      return [error];
    }

    return [];
  })();

  return (
    <Box>
      <Label sx={{ display: 'flex', flexDirection: 'column' }}>
        {label && <Text as="span">{label}</Text>}
        {children}
      </Label>
      {errorAsArray.map((err) => (
        <Text key={err} as="span" variant="error">
          {err}
        </Text>
      ))}
    </Box>
  );
};

export default FormField;
