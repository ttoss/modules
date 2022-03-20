import { Card, Text } from '@ttoss/ui';
import { UserCard_user$key } from './__generated__/UserCard_user.graphql';
import { graphql } from 'babel-plugin-relay/macro';
import { useFragment } from 'react-relay';

export const UserCard = ({
  fragmentRef,
}: {
  fragmentRef: UserCard_user$key;
}) => {
  const user = useFragment<UserCard_user$key>(
    graphql`
      fragment UserCard_user on User {
        name
      }
    `,
    fragmentRef
  );

  return (
    <Card>
      <Text>{user.name}</Text>
    </Card>
  );
};
