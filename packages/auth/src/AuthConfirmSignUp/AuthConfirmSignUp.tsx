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
      code: yup.string().required().max(6),
    })
    .required();

  const { register, handleSubmit } = useForm<yup.TypeOf<typeof schema>>({
    resolver: yupResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit(({ code }) => onConfirmSignUp({ code, email }))}
    >
      <AuthCard
        title={formatMessage({ id: 'auth.confirmSignUp.title' })}
        buttonLabel={formatMessage({ id: 'auth.confirmSignUp.buttonLabel' })}
      >
        <FormField
          label={formatMessage({ id: 'auth.confirmSignUp.confirmationCode' })}
        >
          <Input id="email" {...register('code')} />
        </FormField>
      </AuthCard>
    </form>
  );
};

export default AuthConfirmSignUp;
