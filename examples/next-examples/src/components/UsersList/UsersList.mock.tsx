import * as React from 'react';
import {
  MockPayloadGenerator,
  createMockEnvironment,
} from '@ttoss/test-utils/relay';
import { RelayEnvironmentProvider, useLazyLoadQuery } from 'react-relay';
import { UsersList } from './UsersList';
import { UsersListMockedQuery } from './__generated__/UsersListMockedQuery.graphql';
import { UsersList_query$data } from './__generated__/UsersList_query.graphql';
import { graphql } from 'babel-plugin-relay/macro';

const UsersListQuery = () => {
  const data = useLazyLoadQuery<UsersListMockedQuery>(
    graphql`
      query UsersListMockedQuery @relay_test_operation {
        ...UsersList_query
      }
    `,
    {}
  );

  return <UsersList fragmentRef={data} />;
};

export const environment = createMockEnvironment();

export type UserListMockProps = {
  usersConnection: Partial<
    Omit<UsersList_query$data, ' $fragmentType'>['users']
  >;
};

export const UserListMock = ({ usersConnection }: UserListMockProps) => {
  React.useEffect(() => {
    const operation = environment.mock.getMostRecentOperation();

    environment.mock.nextValue(
      operation,
      MockPayloadGenerator.generate(operation, {
        UsersConnection: (context) => {
          const generatedEdges = (() => {
            if (context.args?.first) {
              return [...new Array(context.args?.first)].map((_, index) => {
                return {
                  cursor: `cursor-${index}`,
                  node: {
                    id: `user-id-${index}`,
                    name: `user-name-${index}`,
                  },
                };
              });
            }

            return [];
          })();

          const edges = usersConnection?.edges || generatedEdges;

          const pageInfo = usersConnection?.pageInfo || { hasNextPage: true };

          return { edges, pageInfo };
        },
      })
    );
  }, [usersConnection]);

  return (
    <RelayEnvironmentProvider environment={environment}>
      <React.Suspense fallback="loading...">
        <UsersListQuery />
      </React.Suspense>
    </RelayEnvironmentProvider>
  );
};
