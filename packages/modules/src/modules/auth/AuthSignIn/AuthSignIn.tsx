import * as React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button, Input } from 'theme-ui';

import Form from '../../../components/Form/Form';
import AuthContainer from '../AuthContainer/AuthContainer';

import type { OnSignIn, OnSignInInput } from '../types';

const { FormItem } = Form;

type AuthSignInProps = {
  onSignIn: OnSignIn;
  onSignUp: () => void;
  defaultValues?: OnSignInInput;
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

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<OnSignInInput>({ defaultValues, resolver: yupResolver(schema) });

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
        <FormItem
          label="e-mail"
          name="email"
          errorMessage={touchedFields.email && errors.email?.message}
        >
          <Input id="email" {...register('email')} />
        </FormItem>

        <FormItem
          label="senha"
          name="password"
          errorMessage={touchedFields.password && errors.password?.message}
        >
          <Input id="password" {...register('password')} type="password" />
        </FormItem>

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
