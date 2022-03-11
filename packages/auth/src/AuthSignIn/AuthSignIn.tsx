import { useForm, yup, yupResolver } from '@ttoss/form';
import { FormField, Input } from '@ttoss/ui';

import { useI18n } from '@ttoss/i18n';

import { PASSWORD_MINIMUM_LENGTH } from '../../cloud/config';

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
          description: 'Email is a required field.',
          defaultMessage: 'Email field is required',
        })
      )
      .email(
        intl.formatMessage({
          description: 'Invalid email.',
          defaultMessage: 'Invalid email',
        })
      ),
    password: yup
      .string()
      .required(
        intl.formatMessage({
          description: 'Password is required.',
          defaultMessage: 'Password field is required',
        })
      )
      .min(
        PASSWORD_MINIMUM_LENGTH,
        intl.formatMessage(
          {
            description: 'Password must be at least {value} characters long.',
            defaultMessage: 'Password requires {value} characters',
          },
          { value: PASSWORD_MINIMUM_LENGTH }
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
          description: 'Sign in title.',
          defaultMessage: 'Login',
        })}
        buttonLabel={intl.formatMessage({
          description: 'Button label.',
          defaultMessage: 'Login',
        })}
        links={[
          {
            onClick: onSignUp,
            label: intl.formatMessage({
              description: 'Link to retrieve password.',
              defaultMessage: 'Do you forgot your password?',
            }),
          },
          {
            onClick: onSignUp,
            label: intl.formatMessage({
              description: 'Link to sign up.',
              defaultMessage: "Don't have an account? Sign up",
            }),
          },
        ]}
      >
        <FormField error={errors?.email?.message}>
          <Input
            aria-label="email"
            placeholder={intl.formatMessage({
              description: 'Email',
              defaultMessage: 'Email',
            })}
            {...register('email')}
          />
        </FormField>

        <Input
          aria-label="password"
          id="password"
          placeholder={intl.formatMessage({
            description: 'Password.',
            defaultMessage: 'Password',
          })}
          {...register('password')}
          type="password"
        />
      </AuthCard>
    </form>
  );
};

export default AuthSignIn;
