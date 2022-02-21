import { useForm, yup, yupResolver } from '@ttoss/form';
import { Input } from '@ttoss/ui';

import { useIntl } from '@ttoss/i18n';

import { AuthCard } from '../AuthCard/AuthCard';

import type { OnSignIn, OnSignInInput } from '../types';

export type AuthSignInProps = {
  onSignIn: OnSignIn;
  onSignUp: () => void;
  defaultValues?: Partial<OnSignInInput>;
  urlLogo?: string;
};

const AuthSignIn = ({ onSignIn, onSignUp, defaultValues }: AuthSignInProps) => {
  const { formatMessage } = useIntl();

  const schema = yup.object().shape({
    email: yup
      .string()
      .required(
        formatMessage({ id: 'auth.signIn.field.email.messages.required' })
      )
      .email(
        formatMessage({
          id: 'auth.signIn.field.email.messages.validEmail',
        })
      ),
    password: yup
      .string()
      .required()
      .min(
        4,
        formatMessage(
          { id: 'auth.signIn.field.password.messages.min' },
          { value: 4 }
        )
      )
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
        title="Login"
        buttonLabel="Login"
        links={[
          {
            onClick: onSignUp,
            label: formatMessage({
              id: 'auth.signIn.links.forgotPassword',
              defaultMessage: 'Esqueceu a senha?',
            }),
          },
          {
            onClick: onSignUp,
            label: formatMessage({
              id: 'auth.signIn.links.signUp',
              defaultMessage: 'Não tem uma conta? Cadastre-se',
            }),
          },
        ]}
      >
        <Input placeholder="Email" {...register('email')} />

        <Input
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
