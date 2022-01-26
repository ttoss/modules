import { Button, Card, Flex, Link, Text } from '@ttoss/ui';

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
  return (
    <Card variant="primary" sx={{ maxWidth: '500px' }}>
      <Flex sx={{ flexDirection: 'column', gap: 3 }}>
        <Text variant="title">{title}</Text>
        {children}
        <Button type="submit" aria-label="submit-login">
          {buttonLabel}
        </Button>
        <Flex sx={{ justifyContent: 'space-between', flexDirection: 'column' }}>
          {leftLink && <Link onClick={leftLink.onClick}>{leftLink.label}</Link>}
          {rightLink && (
            <Link onClick={rightLink.onClick}>{rightLink.label}</Link>
          )}
        </Flex>
      </Flex>
    </Card>
  );
};
