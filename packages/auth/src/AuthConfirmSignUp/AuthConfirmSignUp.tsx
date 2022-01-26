import { Button, FormField, Input } from '@ttoss/ui';
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
    <AuthCard title="Confirm SignUp" buttonLabel="Confirmar">
      <form
        onSubmit={handleSubmit(({ code }) => onConfirmSignUp({ code, email }))}
      >
        <FormField label="Confirmation Code">
          <Input id="email" {...register('code')} />
        </FormField>

        <Button
          type="submit"
          sx={{ paddingX: '32px', backgroundColor: '#222', cursor: 'pointer' }}
        >
          Confirmar
        </Button>
      </form>
    </AuthCard>
  );
};

export default AuthConfirmSignUp;
