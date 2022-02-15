import { Button, Card, Flex, Link } from '@ttoss/ui';
import { useNotifications } from '@ttoss/notifications';
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
  buttonLabel: string;
  links?: LinkProps[];
  forgotPassword?: LinkProps;
};

export const AuthCard = ({
  children,
  buttonLabel,
  links = [],
  forgotPassword,
}: AuthCardProps) => {
  const { logo } = React.useContext(LogoContext);

  const { isLoading } = useNotifications();

  return (
    <Card sx={{ maxWidth: '340px' }}>
      <Flex sx={{ flexDirection: 'column', gap: 3 }}>
        {logo && (
          <Flex sx={{ width: '100%', justifyContent: 'center' }}>{logo}</Flex>
        )}

        {children}
        <Flex sx={{ justifyContent: 'space-between', marginTop: 7 }}>
          <Button
            type="submit"
            aria-label="submit-login"
            variant="primary"
            disabled={isLoading}
          >
            {buttonLabel}
          </Button>
          {forgotPassword && (
            <Link onClick={forgotPassword.onClick}>{forgotPassword.label}</Link>
          )}
        </Flex>

        <Flex
          sx={{
            justifyContent: 'space-between',
            flexDirection: 'column',
            gap: 6,
            marginTop: 7,
            color: 'text',
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
