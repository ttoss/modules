import { useForm, yup, yupResolver } from '@ttoss/form';
import { Input } from '@ttoss/ui';
import { useIntl } from '@ttoss/i18n';

import { AuthCard } from '../AuthCard/AuthCard';

import type { OnSignUp, OnSignUpInput } from '../types';

export type AuthSignUpProps = {
  onSignUp: OnSignUp;
  onReturnToSignIn: () => void;
};

const AuthSignUp = ({ onSignUp, onReturnToSignIn }: AuthSignUpProps) => {
  const { formatMessage } = useIntl();

  const schema = yup.object().shape({
    email: yup
      .string()
      .required(
        formatMessage({ id: 'auth.signUp.field.email.messages.required' })
      )
      .email(
        formatMessage({
          id: 'auth.signUp.field.email.messages.validEmail',
        })
      ),
    password: yup
      .string()
      .required()
      .min(
        4,
        formatMessage(
          { id: 'auth.signUp.field.password.messages.min' },
          { value: 4 }
        )
      )
      .trim(),
  });

  const { register, handleSubmit } = useForm<OnSignUpInput>({
    resolver: yupResolver(schema),
  });

  const onSubmitForm = (data: OnSignUpInput) => onSignUp(data);

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <AuthCard
        buttonLabel="Criar Conta"
        title="Cadastrar"
        links={[
          {
            label: 'Já tem uma conta? Faça o login',
            onClick: onReturnToSignIn,
          },
        ]}
      >
        <Input placeholder="Email" id="email" {...register('email')} />

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

export default AuthSignUp;
