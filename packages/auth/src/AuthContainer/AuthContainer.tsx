import * as React from 'react';
import { Button, Flex, Image, Text } from 'theme-ui';

import LogoDemo from '../../../components/LogoDemo/index';

type LinkButtonProps = {
  children: React.ReactNode | React.ReactNodeArray;
  onClick: () => void;
};

const LinkButton = ({ children, onClick }: LinkButtonProps) => {
  return (
    <Button
      as="a"
      sx={{ color: 'black', cursor: 'pointer', marginTop: '24px' }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

type AuthContainerProps = {
  children: React.ReactNode | React.ReactNodeArray;
  urlLogo?: string;
  title: string;
  links?: Array<{
    label: string;
    onClick: () => void;
  }>;
};

const AuthContainer = ({
  children,
  urlLogo,
  title,
  links,
}: AuthContainerProps) => {
  return (
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
          textTransform: 'uppercase',
        }}
      >
        {title}
      </Text>
      {children}
      {links?.map((link) => (
        <LinkButton key={link.label} onClick={link.onClick}>
          {link.label}
        </LinkButton>
      ))}
    </Flex>
  );
};

export default AuthContainer;
