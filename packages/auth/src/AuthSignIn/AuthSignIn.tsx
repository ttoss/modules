import { useForm, yup, yupResolver } from '@ttoss/form';
import { FormField, Input } from '@ttoss/ui';

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
        <FormField
          label={formatMessage({
            id: 'auth.signIn.field.email.label',
            defaultMessage: 'e-mail',
          })}
        >
          <Input {...register('email')} />
        </FormField>

        <FormField
          label={formatMessage({
            id: 'auth.signIn.field.password.label',
            defaultMessage: 'senha',
          })}
        >
          <Input id="password" {...register('password')} type="password" />
        </FormField>
      </AuthCard>
    </form>
  );
};

export default AuthSignIn;
