import { FormField, Input } from '@ttoss/ui';
import { useForm, yup, yupResolver } from '@ttoss/form';

import { AuthCard } from '../AuthCard/AuthCard';
import { useI18n } from '@ttoss/i18n';

import type { OnConfirmSignUp } from '../types';

const AuthConfirmSignUp = ({
  email,
  onConfirmSignUp,
}: {
  email: string;
  onConfirmSignUp: OnConfirmSignUp;
}) => {
  const { intl } = useI18n();

  const schema = yup
    .object()
    .shape({
      code: yup
        .string()
        .required(
          intl.formatMessage({
            description: 'Required field.',
            defaultMessage: 'Required field',
          })
        )
        .max(
          6,
          intl.formatMessage(
            {
              description: 'Minimum {value} characters.',
              defaultMessage: 'Minimum {value} characters',
            },
            { value: 6 }
          )
        ),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<yup.TypeOf<typeof schema>>({
    resolver: yupResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit(({ code }) => onConfirmSignUp({ code, email }))}
    >
      <AuthCard
        buttonLabel={intl.formatMessage({
          description: 'Confirm',
          defaultMessage: 'Confirm',
        })}
        title={intl.formatMessage({
          description: 'Confirmation',
          defaultMessage: 'Confirmation',
        })}
      >
        <FormField error={errors?.password?.message}>
          <Input
            id="email"
            aria-label="email"
            placeholder={intl.formatMessage({
              description: 'Email',
              defaultMessage: 'Email',
            })}
            {...register('code')}
          />
        </FormField>
      </AuthCard>
    </form>
  );
};

export default AuthConfirmSignUp;
