import { useForm, yup, yupResolver } from '@ttoss/form';
import { FormField, Input } from '@ttoss/ui';
import { useIntl } from '@ttoss/i18n';

import { AuthCard } from '../AuthCard/AuthCard';

import type { OnSignUp, OnSignUpInput } from '../types';

export type AuthSignUpProps = {
  onSignUp: OnSignUp;
};

const AuthSignUp = ({ onSignUp }: AuthSignUpProps) => {
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
        title={formatMessage({ id: 'auth.signUp.title' })}
        buttonLabel={formatMessage({ id: 'auth.signUp.buttonLabel' })}
      >
        <FormField
          label={formatMessage({
            id: 'auth.signUp.field.email.label',
            defaultMessage: 'e-mail',
          })}
        >
          <Input id="email" {...register('email')} />
        </FormField>

        <FormField
          label={formatMessage({
            id: 'auth.signUp.field.password.label',
            defaultMessage: 'senha',
          })}
        >
          <Input id="password" {...register('password')} type="password" />
        </FormField>
      </AuthCard>
    </form>
  );
};

export default AuthSignUp;
