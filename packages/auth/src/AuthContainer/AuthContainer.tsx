import { Button, Card, Image, Text } from '@ttoss/ui';

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
    <Card variant="compact">
      {urlLogo && (
        <Image sx={{ maxHeight: '120px', marginY: '14px' }} src={urlLogo} />
      )}
      <Text
        variant="title"
        sx={{
          variant: 'title',
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
    </Card>
  );
};

export default AuthContainer;
