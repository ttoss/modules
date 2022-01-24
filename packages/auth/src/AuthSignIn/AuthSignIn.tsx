import { useForm, yup, yupResolver } from '@ttoss/form';
import { Button, FormField, Input } from '@ttoss/ui';

import AuthContainer from '../AuthContainer/AuthContainer';

import type { OnSignIn, OnSignInInput } from '../types';

export type AuthSignInProps = {
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

  const { register, handleSubmit } = useForm<OnSignInInput>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmitForm = (data: OnSignInInput) => onSignIn(data);

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <AuthContainer
        title="Login"
        buttonLabel="Login"
        leftLink={{
          onClick: onSignUp,
          label: 'Esqueceu a senha?',
        }}
        rightLink={{
          onClick: onSignUp,
          label: 'Não tem uma conta? Cadastre-se',
        }}
      >
        <FormField label="e-mail">
          <Input {...register('email')} />
        </FormField>

        <FormField label="senha">
          <Input id="password" {...register('password')} type="password" />
        </FormField>
      </AuthContainer>
    </form>
  );
};

export default AuthSignIn;
