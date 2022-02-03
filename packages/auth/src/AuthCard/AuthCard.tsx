import { Button, Card, Flex, Link, Text } from '@ttoss/ui';
import * as React from 'react';

export type LogoContextProps = { logo?: React.ReactNode };

const LogoContext = React.createContext<LogoContextProps>({});

export const LogoProvider: React.FC<LogoContextProps> = ({
  children,
  ...values
}) => {
  return <LogoContext.Provider value={values}>{children}</LogoContext.Provider>;
};

type LinkProps = {
  label: string;
  onClick: () => void;
};

type AuthCardProps = {
  children: React.ReactNode;
  title: string;
  buttonLabel: string;
  links?: LinkProps[];
};

export const AuthCard = ({
  children,
  title,
  buttonLabel,
  links = [],
}: AuthCardProps) => {
  const { logo } = React.useContext(LogoContext);

  return (
    <Card variant="primary" sx={{ maxWidth: '500px' }}>
      <Flex sx={{ flexDirection: 'column', gap: 3 }}>
        {logo && (
          <Flex sx={{ width: '100%', justifyContent: 'center' }}>{logo}</Flex>
        )}
        <Text variant="title">{title}</Text>
        {children}
        <Button type="submit" aria-label="submit-login">
          {buttonLabel}
        </Button>
        <Flex
          sx={{
            justifyContent: 'space-between',
            flexDirection: 'column',
            gap: 2,
            marginTop: 3,
          }}
        >
          {links.map((link) => {
            return (
              link && (
                <Link key={link.label} onClick={link.onClick}>
                  {link.label}
                </Link>
              )
            );
          })}
        </Flex>
      </Flex>
    </Card>
  );
};
