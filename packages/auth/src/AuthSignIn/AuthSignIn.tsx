import { useForm, yup, yupResolver } from '@ttoss/form';
import { FormField, Input } from '@ttoss/ui';

import { AuthCard } from '../AuthCard/AuthCard';

import type { OnSignIn, OnSignInInput } from '../types';

export type AuthSignInProps = {
  onSignIn: OnSignIn;
  onSignUp: () => void;
  defaultValues?: Partial<OnSignInInput>;
  urlLogo?: string;
};

const AuthSignIn = ({ onSignIn, onSignUp, defaultValues }: AuthSignInProps) => {
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

  const { register, handleSubmit } = useForm<OnSignInInput>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmitForm = (data: OnSignInInput) => onSignIn(data);

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <AuthCard
        title="Login"
        buttonLabel="Login"
        links={[
          {
            onClick: onSignUp,
            label: 'Esqueceu a senha?',
          },
          {
            onClick: onSignUp,
            label: 'Não tem uma conta? Cadastre-se',
          },
        ]}
      >
        <FormField label="e-mail">
          <Input {...register('email')} />
        </FormField>

        <FormField label="senha">
          <Input id="password" {...register('password')} type="password" />
        </FormField>
      </AuthCard>
    </form>
  );
};

export default AuthSignIn;
