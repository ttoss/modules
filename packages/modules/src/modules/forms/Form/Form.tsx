import * as React from 'react';

import { ErrorMessage as HookFormErrorMessage } from '@hookform/error-message';
import { FormState } from 'react-hook-form';
import { Box, BoxProps, Label, Text, ThemeUIStyleObject } from 'theme-ui';

const Form = ({
  children,
  sx,
  ...props
}: {
  children?: React.ReactNode;
  sx?: ThemeUIStyleObject;
} & BoxProps) => {
  return (
    <Box as="form" {...props} sx={sx}>
      {children}
    </Box>
  );
};

export const ErrorMessage = ({
  name,
  formState,
}: {
  name: string;
  formState?: FormState<any>;
}) => {
  return (
    <HookFormErrorMessage
      errors={formState.errors}
      name={name}
      render={({ message, messages }) => {
        /**
         * Messages is an array.
         */
        if (messages) {
          return (
            <>
              {Object.entries(messages).map(([type, message]) => (
                <Text variant="text.error" role="alert" key={type}>
                  {message}
                </Text>
              ))}
            </>
          );
        }

        return (
          <Text variant="text.error" role="alert">
            {message}
          </Text>
        );
      }}
    />
  );
};

const Field = ({
  name,
  children,
  label,
  formState,
}: {
  name: string;
  children?: React.ReactNode;
  label?: string;
  formState?: FormState<any>;
}) => {
  return (
    <Box>
      <Label>
        {label && <Text as="span">{label}</Text>}
        {children}
      </Label>
      <ErrorMessage name={name} formState={formState} />
    </Box>
  );
};

Form.ErrorMessage = ErrorMessage;
Form.Field = Field;

export default Form;
