import * as React from 'react';

import { Button, Input } from 'theme-ui';

import { Form, useForm, yup, yupResolver } from '../../forms';

import AuthContainer from '../AuthContainer/AuthContainer';

import type { OnConfirmSignUp } from '../types';

const AuthConfirmSignUp = ({
  email,
  onConfirmSignUp,
}: {
  email: string;
  onConfirmSignUp: OnConfirmSignUp;
}) => {
  const schema = yup
    .object()
    .shape({
      code: yup.string().required().max(6),
    })
    .required();

  const { register, handleSubmit, formState } = useForm<
    yup.TypeOf<typeof schema>
  >({
    resolver: yupResolver(schema),
  });

  return (
    <AuthContainer title="Confirm SignUp">
      <Form
        onSubmit={handleSubmit(({ code }) => onConfirmSignUp({ code, email }))}
      >
        <Form.Field label="Confirmation Code" name="code" formState={formState}>
          <Input id="email" {...register('code')} />
        </Form.Field>

        <Button
          type="submit"
          sx={{ paddingX: '32px', backgroundColor: '#222', cursor: 'pointer' }}
        >
          Confirmar
        </Button>
      </Form>
    </AuthContainer>
  );
};

export default AuthConfirmSignUp;
