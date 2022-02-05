import { useForm, yup, yupResolver } from '@ttoss/form';
import { Input } from '@ttoss/ui';

import { AuthCard } from '../AuthCard/AuthCard';

import type { OnSignIn, OnSignInInput } from '../types';

export type AuthSignInProps = {
  onSignIn: OnSignIn;
  onSignUp: () => void;
  defaultValues?: Partial<OnSignInInput>;
  urlLogo?: string;
};

const AuthSignIn = ({ onSignIn, onSignUp, defaultValues }: AuthSignInProps) => {
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
      <AuthCard
        buttonLabel="Login"
        links={[
          {
            onClick: onSignUp,
            label: 'Criar conta',
          },
          {
            onClick: onSignUp,
            label: 'Reenviar email de confirmação',
          },
        ]}
        forgotPassword={{
          onClick: onSignUp,
          label: 'Esqueci a senha',
        }}
      >
        <Input
          variant="forms.auth.input"
          placeholder="Email"
          {...register('email')}
        />

        <Input
          sx={{ marginTop: 5 }}
          variant="forms.auth.input"
          placeholder="Senha"
          id="password"
          {...register('password')}
          type="password"
        />
      </AuthCard>
    </form>
  );
};

export default AuthSignIn;
