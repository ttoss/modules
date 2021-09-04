import * as React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button, Input } from 'theme-ui';

import { Form } from '../../forms';

import AuthContainer from '../AuthContainer/AuthContainer';

import type { OnSignIn, OnSignInInput } from '../types';

type AuthSignInProps = {
  onSignIn: OnSignIn;
  onSignUp: () => void;
  defaultValues?: Partial<OnSignInInput>;
  urlLogo?: string;
};

const AuthSignIn = ({
  onSignIn,
  onSignUp,
  defaultValues,
  urlLogo,
}: AuthSignInProps) => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Custom required message')
      .email('Custom email message'),
    password: yup
      .string()
      .required()
      .min(4, 'Custom min length message')
      .trim(),
  });

  const { register, handleSubmit, formState } = useForm<OnSignInInput>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmitForm = (data: OnSignInInput) => onSignIn(data);

  return (
    <Form onSubmit={handleSubmit(onSubmitForm)}>
      <AuthContainer
        links={[
          {
            label: 'Criar Conta',
            onClick: onSignUp,
          },
          // { label: 'Recuperar Senha', href: '/recovery-password' },
        ]}
        title="Login"
        urlLogo={urlLogo}
      >
        <Form.Field label="e-mail" name="email" formState={formState}>
          <Input {...register('email')} />
        </Form.Field>

        <Form.Field label="senha" name="password" formState={formState}>
          <Input id="password" {...register('password')} type="password" />
        </Form.Field>

        <Button
          type="submit"
          sx={{ paddingX: '32px', backgroundColor: '#222', cursor: 'pointer' }}
          aria-label="submit-login"
        >
          Login
        </Button>
      </AuthContainer>
    </Form>
  );
};

export default AuthSignIn;
