import { useForm, yup, yupResolver } from '@ttoss/form';
import { FormField, Input } from '@ttoss/ui';
import { useI18n } from '@ttoss/i18n';

import { AuthCard } from '../AuthCard/AuthCard';

import type { OnSignUp, OnSignUpInput } from '../types';

export type AuthSignUpProps = {
  onSignUp: OnSignUp;
  onReturnToSignIn: () => void;
};

const AuthSignUp = ({ onSignUp, onReturnToSignIn }: AuthSignUpProps) => {
  const { intl } = useI18n();

  const schema = yup.object().shape({
    email: yup
      .string()
      .required(
        intl.formatMessage({
          description: 'AuthSignUp - email is required',
          defaultMessage: 'O campo de e-mail é obrigatório',
        })
      )
      .email(
        intl.formatMessage({
          defaultMessage: 'Deve-se inserir um e-mail válido',
          description: 'AuthSignUp - email should be valid',
        })
      ),
    password: yup
      .string()
      .required(
        intl.formatMessage({
          defaultMessage: 'O campo de senha é obrigatório',
          description: 'AuthSignUp - password is required',
        })
      )
      .min(
        4,
        intl.formatMessage(
          {
            defaultMessage: 'Mínimo de {value} caracteres',
            description: 'AuthSignUp min value required to password',
          },
          { value: 4 }
        )
      )
      .trim(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OnSignUpInput>({
    resolver: yupResolver(schema),
  });

  const onSubmitForm = (data: OnSignUpInput) => onSignUp(data);

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <AuthCard
        buttonLabel={intl.formatMessage({
          description: 'AuthSignUp - button label: Create account',
          defaultMessage: 'Criar Conta',
        })}
        title={intl.formatMessage({
          description: 'AuthSignUp - title: Register',
          defaultMessage: 'Cadastrar',
        })}
        links={[
          {
            label: intl.formatMessage({
              description: 'AuthSignUp - link: Create account',
              defaultMessage: 'Já tem uma conta? Faça o login',
            }),
            onClick: onReturnToSignIn,
          },
        ]}
      >
        <FormField error={errors?.email?.message}>
          <Input
            aria-label="email"
            placeholder={intl.formatMessage({
              description: 'AuthSignUp - Input placeholder email',
              defaultMessage: 'Email',
            })}
            id="email"
            {...register('email')}
          />
        </FormField>

        <FormField error={errors?.password?.message}>
          <Input
            aria-label="password"
            placeholder={intl.formatMessage({
              description: 'AuthSignUp - Input placeholder password',
              defaultMessage: 'Senha',
            })}
            id="password"
            {...register('password')}
            type="password"
          />
        </FormField>
      </AuthCard>
    </form>
  );
};

export default AuthSignUp;
