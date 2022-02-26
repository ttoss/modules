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
        formatMessage({
          description: 'AuthSignIn - email is required',
          defaultMessage: 'O campo de e-mail é obrigatório',
        })
      )
      .email(
        formatMessage({
          defaultMessage: 'Deve-se inserir um e-mail válido',
          description: 'AuthSignIn - email should be valid',
        })
      ),
    password: yup
      .string()
      .required(
        formatMessage({
          defaultMessage: 'O campo de senha é obrigatório',
          description: 'AuthSignIn - password is required',
        })
      )
      .min(
        4,
        formatMessage(
          {
            defaultMessage: 'Mínimo de {value} caracteres',
            description: 'AuthSignIn min value required to password',
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
  } = useForm<OnSignInInput>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmitForm = (data: OnSignInInput) => onSignIn(data);

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <AuthCard
        title={formatMessage({
          description: 'AuthSignUp - title: Login',
          defaultMessage: 'Login',
        })}
        buttonLabel={formatMessage({
          description: 'AuthSignIn - button label: Login',
          defaultMessage: 'Login',
        })}
        links={[
          {
            onClick: onSignUp,
            label: formatMessage({
              description: 'AuthSignIn - title: Register',
              defaultMessage: 'Esqueceu a senha?',
            }),
          },
          {
            onClick: onSignUp,
            label: formatMessage({
              description: 'AuthSignIn - link: Create account',
              defaultMessage: 'Não tem uma conta? Cadastre-se',
            }),
          },
        ]}
      >
        <FormField error={errors?.email?.message}>
          <Input
            aria-label="email"
            placeholder={formatMessage({
              description: 'AuthSignIn - Input placeholder email',
              defaultMessage: 'Email',
            })}
            {...register('email')}
          />
        </FormField>

        <Input
          aria-label="password"
          id="password"
          placeholder={formatMessage({
            description: 'AuthSignIn - Input placeholder password',
            defaultMessage: 'Senha',
          })}
          {...register('password')}
          type="password"
        />
      </AuthCard>
    </form>
  );
};

export default AuthSignIn;
