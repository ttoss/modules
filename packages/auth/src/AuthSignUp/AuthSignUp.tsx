import { FormField, Input } from '@ttoss/ui';
import { useForm, yup, yupResolver } from '@ttoss/form';
import { useI18n } from '@ttoss/i18n';

import { PASSWORD_MINIMUM_LENGTH } from '../../cloud/config';

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
  } = useForm<OnSignUpInput>({
    resolver: yupResolver(schema),
  });

  const onSubmitForm = (data: OnSignUpInput) => onSignUp(data);

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <AuthCard
        buttonLabel={intl.formatMessage({
          description: 'Create account.',
          defaultMessage: 'Create account',
        })}
        title={intl.formatMessage({
          description: 'Title on sign up.',
          defaultMessage: 'Register',
        })}
        links={[
          {
            label: intl.formatMessage({
              description: 'Link to sign in on sign up.',
              defaultMessage: 'Do you already have an account? Sign in',
            }),
            onClick: onReturnToSignIn,
          },
        ]}
      >
        <FormField error={errors?.email?.message}>
          <Input
            aria-label="email"
            placeholder={intl.formatMessage({
              description: 'Email placeholder text.',
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
              description: 'Password placeholder text.',
              defaultMessage: 'Password',
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
