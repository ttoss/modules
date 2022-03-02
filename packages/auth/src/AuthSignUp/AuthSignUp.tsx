import { useForm, yup, yupResolver } from '@ttoss/form';
import { FormField, Input } from '@ttoss/ui';
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
        formatMessage({
          description: 'AuthSignUp - email is required',
          defaultMessage: 'O campo de e-mail é obrigatório',
        })
      )
      .email(
        formatMessage({
          defaultMessage: 'Deve-se inserir um e-mail válido',
          description: 'AuthSignUp - email should be valid',
        })
      ),
    password: yup
      .string()
      .required(
        formatMessage({
          defaultMessage: 'O campo de senha é obrigatório',
          description: 'AuthSignUp - password is required',
        })
      )
      .min(
        4,
        formatMessage(
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
        buttonLabel={formatMessage({
          description: 'AuthSignUp - button label: Create account',
          defaultMessage: 'Criar Conta',
        })}
        title={formatMessage({
          description: 'AuthSignUp - title: Register',
          defaultMessage: 'Cadastrar',
        })}
        links={[
          {
            label: formatMessage({
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
            placeholder={formatMessage({
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
            placeholder={formatMessage({
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
