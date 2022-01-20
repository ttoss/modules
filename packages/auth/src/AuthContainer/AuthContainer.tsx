import { Button, Card, Flex, Text } from '@ttoss/ui';

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

type LinkProps = {
  label: string;
  onClick: () => void;
};

type AuthContainerProps = {
  children: React.ReactNode;
  logo?: React.ReactNode;
  title: string;
  leftLink?: LinkProps[];
  rightLink?: LinkProps[];
};

const AuthContainer = ({
  children,
  logo,
  title,
  rightLink,
  leftLink,
}: AuthContainerProps) => {
  return (
    <Card variant="primary">
      <Flex>
        <Flex>{logo}</Flex>
        <Text variant="title">{title}</Text>
        {children}
        {links?.map((link) => (
          <LinkButton key={link.label} onClick={link.onClick}>
            {link.label}
          </LinkButton>
        ))}
      </Flex>
    </Card>
  );
};

export default AuthContainer;
