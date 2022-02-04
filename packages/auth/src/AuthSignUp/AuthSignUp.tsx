import { useForm, yup, yupResolver } from '@ttoss/form';
import { Input } from '@ttoss/ui';

import { AuthCard } from '../AuthCard/AuthCard';
import { defaultStyleInput } from '../styles';

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
      <AuthCard buttonLabel="Criar Conta">
        <Input
          sx={defaultStyleInput}
          placeholder="Email"
          id="email"
          {...register('email')}
        />
        <Input
          sx={defaultStyleInput}
          placeholder="Senha"
          id="password"
          {...register('password')}
          type="password"
        />
      </AuthCard>
    </form>
  );
};

export default AuthSignUp;
