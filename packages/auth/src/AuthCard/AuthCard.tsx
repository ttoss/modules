import { Button, Card, Flex, Link } from '@ttoss/ui';
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

  return (
    <Card variant="forms.auth.cardContainer">
      <Flex sx={{ flexDirection: 'column', gap: 3 }}>
        {logo && (
          <Flex sx={{ width: '100%', justifyContent: 'center' }}>{logo}</Flex>
        )}

        {children}

        <Flex variant="forms.auth.submitButtonContainer">
          <Button
            type="submit"
            aria-label="submit-login"
            variant="forms.auth.submitButton"
          >
            {buttonLabel}
          </Button>
          {forgotPassword && (
            <Link variant="forms.auth.link" onClick={forgotPassword.onClick}>
              {forgotPassword.label}
            </Link>
          )}
        </Flex>

        <Flex variant="forms.auth.containerLinks">
          {links.map((link) => {
            return (
              link && (
                <Link
                  variant="forms.auth.link"
                  key={link.label}
                  onClick={link.onClick}
                >
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
