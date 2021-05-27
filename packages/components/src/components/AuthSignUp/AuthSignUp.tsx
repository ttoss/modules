import * as React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input } from 'theme-ui';
import { useForm } from 'react-hook-form';

import Form from '../Form/Form';
import AuthContainer from '../AuthContainer';

const { FormItem } = Form;

type Fields = {
  email: string;
  password: string;
};

type AuthSignUpProps = {
  onSubmit: (data: Fields) => void;
  defaultValues?: Fields;
  urlLogo?: string;
};

const AuthSignUp = ({ onSubmit, defaultValues, urlLogo }: AuthSignUpProps) => {
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
  } = useForm<Fields>({ defaultValues, resolver: yupResolver(schema) });

  const onSubmitForm = (data: Fields) => onSubmit(data);

  return (
    <Form onSubmit={handleSubmit(onSubmitForm)}>
      <AuthContainer
        links={[{ label: 'Login', href: '/login' }]}
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
