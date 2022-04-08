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
      # @argumentDefinitions tells to the relay compiler that fragment will use
      # the following arguments. We need this because it's the parent component
      # that will declare them.
      # Docs: https://relay.dev/docs/api-reference/graphql-and-directives/#argumentdefinitions
      @argumentDefinitions(
        filters: { type: "UsersQueryFilters" }
        first: { type: "Int" }
        after: { type: "String" }
        last: { type: "Int" }
        before: { type: "String" }
      )
      @refetchable(queryName: "UsersListQuery") {
        users(
          filters: $filters
          first: $first
          after: $after
          last: $last
          before: $before
        ) @connection(key: "UsersList_users") {
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
