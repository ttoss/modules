import { Button, Card, Flex, Link, Text } from '@ttoss/ui';
import * as React from 'react';

type LogoContextProps = { logo?: React.ReactNode };

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
  leftLink?: LinkProps;
  rightLink?: LinkProps;
};

export const AuthCard = ({
  children,
  title,
  buttonLabel,
  leftLink,
  rightLink,
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
          {leftLink && <Link onClick={leftLink.onClick}>{leftLink.label}</Link>}
          {rightLink && (
            <Link onClick={rightLink.onClick}>{rightLink.label}</Link>
          )}
        </Flex>
      </Flex>
    </Card>
  );
};
