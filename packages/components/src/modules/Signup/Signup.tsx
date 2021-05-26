import * as React from 'react';
import { Button, Input } from 'theme-ui';
import Form from '../Form/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AuthContainer from '../../components/AuthContainer';
import * as yup from 'yup';

const { FormControl } = Form;

type Fields = {
  email: string;
  password: string;
};

type SignupProps = {
  onSubmit: (data: Fields) => void;
  defaultValues?: Fields;
  urlLogo?: string;
};

const Signup = ({ onSubmit, defaultValues, urlLogo }: SignupProps) => {
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
        <FormControl
          label="e-mail"
          name="email"
          errorMessage={touchedFields.email && errors.email?.message}
        >
          <Input id="email" {...register('email')} />
        </FormControl>

        <FormControl
          label="senha"
          name="password"
          errorMessage={touchedFields.password && errors.password?.message}
        >
          <Input id="password" {...register('password')} type="password" />
        </FormControl>

        <Button
          type="submit"
          sx={{ paddingX: '32px', backgroundColor: '#222', cursor: 'pointer' }}
          aria-label="submit-Signup"
        >
          Criar
        </Button>
      </AuthContainer>
    </Form>
  );
};

export default Signup;
