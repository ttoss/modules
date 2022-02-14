import { Input } from '@ttoss/ui';
import { useForm, yup, yupResolver } from '@ttoss/form';

import { AuthCard } from '../AuthCard/AuthCard';

import type { OnConfirmSignUp } from '../types';

const AuthConfirmSignUp = ({
  email,
  onConfirmSignUp,
}: {
  email: string;
  onConfirmSignUp: OnConfirmSignUp;
}) => {
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
      <AuthCard buttonLabel="Confirmar">
        <Input id="email" {...register('code')} />
      </AuthCard>
    </form>
  );
};

export default AuthConfirmSignUp;
