import { useForm, yup, yupResolver } from '@ttoss/form';
import { FormField, Input } from '@ttoss/ui';

import { useI18n } from '@ttoss/i18n';

import { AuthCard } from '../AuthCard/AuthCard';

import type { OnSignIn, OnSignInInput } from '../types';

export type AuthSignInProps = {
  onSignIn: OnSignIn;
  onSignUp: () => void;
  defaultValues?: Partial<OnSignInInput>;
  urlLogo?: string;
};

const AuthSignIn = ({ onSignIn, onSignUp, defaultValues }: AuthSignInProps) => {
  const { intl } = useI18n();

  const schema = yup.object().shape({
    email: yup
      .string()
      .required(
        intl.formatMessage({
          description: 'AuthSignIn - email is required',
          defaultMessage: 'O campo de e-mail é obrigatório',
        })
      )
      .email(
        intl.formatMessage({
          defaultMessage: 'Deve-se inserir um e-mail válido',
          description: 'AuthSignIn - email should be valid',
        })
      ),
    password: yup
      .string()
      .required(
        intl.formatMessage({
          defaultMessage: 'O campo de senha é obrigatório',
          description: 'AuthSignIn - password is required',
        })
      )
      .min(
        4,
        intl.formatMessage(
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
        title={intl.formatMessage({
          description: 'AuthSignUp - title: Login',
          defaultMessage: 'Login',
        })}
        buttonLabel={intl.formatMessage({
          description: 'AuthSignIn - button label: Login',
          defaultMessage: 'Login',
        })}
        links={[
          {
            onClick: onSignUp,
            label: intl.formatMessage({
              description: 'AuthSignIn - title: Register',
              defaultMessage: 'Esqueceu a senha?',
            }),
          },
          {
            onClick: onSignUp,
            label: intl.formatMessage({
              description: 'AuthSignIn - link: Create account',
              defaultMessage: 'Não tem uma conta? Cadastre-se',
            }),
          },
        ]}
      >
        <FormField error={errors?.email?.message}>
          <Input
            aria-label="email"
            placeholder={intl.formatMessage({
              description: 'AuthSignIn - Input placeholder email',
              defaultMessage: 'Email',
            })}
            {...register('email')}
          />
        </FormField>

        <Input
          aria-label="password"
          id="password"
          placeholder={intl.formatMessage({
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
