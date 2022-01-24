import { useForm, yup, yupResolver } from '@ttoss/form';
import { FormField, Input } from '@ttoss/ui';

import AuthContainer from '../AuthContainer/AuthContainer';

import type { OnSignUp, OnSignUpInput } from '../types';

export type AuthSignUpProps = {
  onSignUp: OnSignUp;
};

const AuthSignUp = ({ onSignUp }: AuthSignUpProps) => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Custom required message')
      .email('Custom email message'),
    password: yup
      .string()
      .required()
      .min(4, 'Custom min length message')
      .trim(),
  });

  const { register, handleSubmit } = useForm<OnSignUpInput>({
    resolver: yupResolver(schema),
  });

  const onSubmitForm = (data: OnSignUpInput) => onSignUp(data);

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <AuthContainer title="Criar Conta" buttonLabel="Criar Conta">
        <FormField label="e-mail">
          <Input id="email" {...register('email')} />
        </FormField>

        <FormField label="senha">
          <Input id="password" {...register('password')} type="password" />
        </FormField>
      </AuthContainer>
    </form>
  );
};

export default AuthSignUp;
