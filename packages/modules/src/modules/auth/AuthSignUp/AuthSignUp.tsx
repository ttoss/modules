import * as React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input } from 'theme-ui';
import { useForm } from 'react-hook-form';

import Form from '../../../components/Form/Form';
import AuthContainer from '../AuthContainer/AuthContainer';

import type { OnSignUp, OnSignUpInput } from '../types';

const { FormItem } = Form;

type AuthSignUpProps = {
  onSignUp: OnSignUp;
  defaultValues?: OnSignUpInput;
  urlLogo?: string;
};

const AuthSignUp = ({ onSignUp, defaultValues, urlLogo }: AuthSignUpProps) => {
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
  } = useForm<OnSignUpInput>({ defaultValues, resolver: yupResolver(schema) });

  const onSubmitForm = (data: OnSignUpInput) => onSignUp(data);

  return (
    <Form onSubmit={handleSubmit(onSubmitForm)}>
      <AuthContainer
        // links={[{ label: 'Login', href: '/login' }]}
        title="Criar Conta"
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
        >
          Criar
        </Button>
      </AuthContainer>
    </Form>
  );
};

export default AuthSignUp;
