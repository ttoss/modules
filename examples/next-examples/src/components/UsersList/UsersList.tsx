import { Button, Flex } from '@ttoss/ui';
import { UserCard } from '../UserCard/UserCard';
import { UsersListQuery } from './__generated__/UsersListQuery.graphql';
import { UsersList_query$key } from './__generated__/UsersList_query.graphql';
import { graphql } from 'babel-plugin-relay/macro';
import { usePaginationFragment } from 'react-relay';

export type UsersListPaginatorProps = {
  fragmentRef: UsersList_query$key;
};

export const UsersList = ({ fragmentRef }: UsersListPaginatorProps) => {
  const { data, loadNext } = usePaginationFragment<
    UsersListQuery,
    UsersList_query$key
  >(
    graphql`
      fragment UsersList_query on Query
      @argumentDefinitions(
        first: { type: "Int", defaultValue: 10 }
        after: { type: "String" }
      )
      @refetchable(queryName: "UsersListQuery") {
        users(first: $first, after: $after)
          @connection(key: "UsersList_users") {
          edges {
            node {
              id
              ...UserCard_user
            }
          }
          pageInfo {
            hasNextPage
          }
        }
      }
    `,
    fragmentRef
  );

  const { edges, pageInfo } = data.users;

  return (
    <Flex sx={{ flexDirection: 'column' }}>
      {edges?.map(({ node }) => {
        return <UserCard key={node.id} fragmentRef={node} />;
      })}

      {pageInfo.hasNextPage && (
        <Button onClick={() => loadNext(10)}>Load more friends</Button>
      )}
    </Flex>
  );
};
