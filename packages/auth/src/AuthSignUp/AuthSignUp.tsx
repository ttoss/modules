import { useForm, yup, yupResolver } from '@ttoss/form';
import { Button, FormField, Input } from '@ttoss/ui';

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
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <FormField label="e-mail">
          <Input id="email" {...register('email')} />
        </FormField>

        <FormField label="senha">
          <Input id="password" {...register('password')} type="password" />
        </FormField>

        <Button
          type="submit"
          sx={{ paddingX: '32px', backgroundColor: '#222', cursor: 'pointer' }}
        >
          Criar
        </Button>
      </form>
    </AuthContainer>
  );
};

export default AuthSignUp;
