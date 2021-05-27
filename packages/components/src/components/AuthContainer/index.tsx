import * as React from 'react';
import { Flex, Image, Link, Text } from 'theme-ui';

import LogoDemo from '../../components/LogoDemo/index';

type LinkButtonProps = {
  children: React.ReactNode | React.ReactNodeArray;
  href: string;
};

const LinkButton = ({ children, href }: LinkButtonProps) => {
  return (
    <Link
      sx={{
        marginTop: '24px',
        textDecoration: 'underline',
        cursor: 'pointer',
      }}
      href={href}
    >
      {children}
    </Link>
  );
};

type AuthContainerProps = {
  children: React.ReactNode | React.ReactNodeArray;
  urlLogo?: string;
  title: string;
  links?: {
    label: string;
    href: string;
  }[];
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
      {links?.map((link, idx) => (
        <LinkButton key={idx} href={link.href}>
          {link.label}
        </LinkButton>
      ))}
    </Flex>
  );
};

export default AuthContainer;
