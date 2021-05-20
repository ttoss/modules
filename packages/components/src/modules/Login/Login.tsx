import * as React from 'react';
import { Flex, Label, Button, Input, Image, Box, Link, Text } from 'theme-ui';
import Form from '../Form/Form';

import logo from '../../assets/logo-demo.png';

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

type LoginProps = {
  onSubmit: (email: string, password: string) => void;
  urlLogo?: string;
};

const Login = ({ onSubmit, urlLogo }: LoginProps) => {
  const [email, setEmail] = React.useState('rayza.ocr@gmail.com');
  const [password, setPassword] = React.useState('123');

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
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
        <Image src={urlLogo || logo} />
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
          <Label htmlFor="e-mail">e-mail</Label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Box>
        <Box sx={{ width: '100%', marginBottom: '24px' }}>
          <Label htmlFor="password">senha</Label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </Box>

        <Button
          onClick={() => onSubmit(email, password)}
          sx={{ paddingX: '32px', backgroundColor: '#222', cursor: 'pointer' }}
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
