/**
 * Relay docs: https://relay.dev/docs/guides/testing-relay-components/
 */
import * as React from 'react';
import {
  MockPayloadGenerator,
  createMockEnvironment,
} from '@ttoss/test-utils/dist/relay';
import { RelayEnvironmentProvider, useLazyLoadQuery } from 'react-relay';
import { UserCard } from './UserCard';
import { UserCardMockedQuery } from './__generated__/UserCardMockedQuery.graphql';
import { UserCard_user$data } from './__generated__/UserCard_user.graphql';
import { graphql } from 'babel-plugin-relay/macro';

const UserCardQuery = () => {
  const data = useLazyLoadQuery<UserCardMockedQuery>(
    graphql`
      query UserCardMockedQuery @relay_test_operation {
        user: node(id: "user-id") {
          ...UserCard_user
        }
      }
    `,
    {}
  );

  if (!data.user) {
    return <span>Loading...</span>;
  }

  return <UserCard fragmentRef={data.user} />;
};

const environment = createMockEnvironment();

export type UserCardMockProps = {
  user: Omit<UserCard_user$data, ' $fragmentType'>;
};

export const UserCardMock = ({ user }: UserCardMockProps) => {
  React.useEffect(() => {
    const operation = environment.mock.getMostRecentOperation();

    environment.mock.nextValue(
      operation,
      MockPayloadGenerator.generate(operation, {
        User() {
          return user;
        },
      })
    );
  }, [user]);

  return (
    <RelayEnvironmentProvider environment={environment}>
      <React.Suspense fallback="loading...">
        <UserCardQuery />
      </React.Suspense>
    </RelayEnvironmentProvider>
  );
};
