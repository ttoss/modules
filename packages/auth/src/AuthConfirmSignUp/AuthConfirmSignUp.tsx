import { FormField, Input } from '@ttoss/ui';
import { useForm, yup, yupResolver } from '@ttoss/form';

import { AuthCard } from '../AuthCard/AuthCard';
import { useIntl } from '@ttoss/i18n';

import type { OnConfirmSignUp } from '../types';

const AuthConfirmSignUp = ({
  email,
  onConfirmSignUp,
}: {
  email: string;
  onConfirmSignUp: OnConfirmSignUp;
}) => {
  const { formatMessage } = useIntl();

  const schema = yup
    .object()
    .shape({
      code: yup
        .string()
        .required(
          formatMessage({
            description: 'AuthConfirmSignUp - email is required',
            defaultMessage: 'O campo de e-mail é obrigatório',
          })
        )
        .max(
          6,
          formatMessage(
            {
              defaultMessage: 'Mínimo de {value} caracteres',
              description: 'AuthConfirmSignUp min value required to email',
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
        buttonLabel={formatMessage({
          description: 'AuthConfirmSignUp - buttonLabel: Confirm',
          defaultMessage: 'Confirmar',
        })}
        title={formatMessage({
          description: 'AuthConfirmSignUp - title: Confirmation',
          defaultMessage: 'Confirmação',
        })}
      >
        <FormField error={errors?.password?.message}>
          <Input
            id="email"
            placeholder={formatMessage({
              description: 'AuthConfirmSignUp - Input placeholder email',
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
