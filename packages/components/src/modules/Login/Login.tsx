import * as React from 'react';
import { Flex, Label, Button, Input, Image, Box, Link, Text } from 'theme-ui';
import Form from '../Form/Form';
import { useForm } from 'react-hook-form';
import LogoDemo from '../../components/LogoDemo/index';

type LinkButtonProps = {
  children: React.ReactNode | React.ReactNodeArray;
};

const LinkButton = ({ children }: LinkButtonProps) => {
  return (
    <Link
      sx={{
        marginTop: '24px',
        textDecoration: 'underline',
        cursor: 'pointer',
      }}
    >
      {children}
    </Link>
  );
};

type Fields = {
  email: string;
  password: string;
};

type LoginProps = {
  onSubmit: (data: Fields) => void;
  defaultValues?: Fields;
  urlLogo?: string;
};

const Login = ({ onSubmit, defaultValues, urlLogo }: LoginProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<Fields>({ defaultValues });

  const onSubmitForm = (data: Fields) => onSubmit(data);

  return (
    <Form onSubmit={handleSubmit(onSubmitForm)}>
      <Flex
        sx={{
          maxWidth: '400px',
          width: '100%',
          border: 'solid 2px #444',
          padding: '32px',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'text',
          fontFamily: 'Arial',
        }}
      >
        {urlLogo ? (
          <Image sx={{ maxHeight: '120px', marginY: '14px' }} src={urlLogo} />
        ) : (
          <LogoDemo />
        )}
        <Text
          sx={{
            marginY: '24px',
            textAlign: 'center',
            width: '100%',
            fontWeight: 'bold',
          }}
        >
          LOGIN
        </Text>
        <Box sx={{ width: '100%', marginBottom: '24px' }}>
          <Label htmlFor="email">e-mail</Label>
          <Input
            role="email-input"
            {...register('email', {
              required: 'O campo e-mail precisa ser preenchido!',

              pattern: {
                message: 'E-mail inválido!',
                value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              },
            })}
          />
          {errors.email && touchedFields.email && (
            <Text sx={{ fontSize: '12px', color: 'red' }}>
              {errors.email.message}
            </Text>
          )}
        </Box>
        <Box sx={{ width: '100%', marginBottom: '24px' }}>
          <Label htmlFor="password">senha</Label>
          <Input
            role="password"
            {...register('password', {
              required: 'A senha é obrigatória!',
              minLength: {
                value: 4,
                message: 'A senha precisa ter no mínimo 4 caracteres!',
              },
            })}
            type="password"
          />
          {errors.password && touchedFields.password && (
            <Text sx={{ fontSize: '12px', color: 'red' }}>
              {errors.password.message}
            </Text>
          )}
        </Box>

        <Button
          type="submit"
          sx={{ paddingX: '32px', backgroundColor: '#222', cursor: 'pointer' }}
          aria-label="submit-login"
        >
          Login
        </Button>

        <LinkButton>Recuperar senha</LinkButton>
        <LinkButton>Criar conta</LinkButton>
      </Flex>
    </Form>
  );
};

export default Login;
