import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button, Input } from 'theme-ui';
import * as yup from 'yup';

import { Form } from '../../../modules/src/modules/forms';

import AuthContainer from '../AuthContainer/AuthContainer';

import type { OnSignUp, OnSignUpInput } from '../types';

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

  const { register, handleSubmit, formState } = useForm<OnSignUpInput>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmitForm = (data: OnSignUpInput) => onSignUp(data);

  return (
    <AuthContainer
      // links={[{ label: 'Login', href: '/login' }]}
      title="Criar Conta"
      urlLogo={urlLogo}
    >
      <Form onSubmit={handleSubmit(onSubmitForm)}>
        <Form.Field label="e-mail" name="email" formState={formState}>
          <Input id="email" {...register('email')} />
        </Form.Field>

        <Form.Field label="senha" name="password" formState={formState}>
          <Input id="password" {...register('password')} type="password" />
        </Form.Field>

        <Button
          type="submit"
          sx={{ paddingX: '32px', backgroundColor: '#222', cursor: 'pointer' }}
        >
          Criar
        </Button>
      </Form>
    </AuthContainer>
  );
};

export default AuthSignUp;
