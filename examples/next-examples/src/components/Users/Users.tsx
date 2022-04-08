import { Button } from '@ttoss/ui';
import {
  PreloadedQuery,
  useLazyLoadQuery,
  usePreloadedQuery,
  useQueryLoader,
} from 'react-relay';
import { UsersList } from '../UsersList/UsersList';
import { UsersQuery } from './__generated__/UsersQuery.graphql';
import { graphql } from 'babel-plugin-relay/macro';

const usersQuery = graphql`
  query UsersQuery(
    $filters: UsersQueryFilters
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    # @arguments tells to the relay compiler that fragment will use these
    # arguments.
    # Docs: https://relay.dev/docs/api-reference/graphql-and-directives/#arguments
    ...UsersList_query
      @arguments(
        filters: $filters
        first: $first
        after: $after
        last: $last
        before: $before
      )
  }
`;

const PreLoadedUsers = ({
  queryReference,
}: {
  queryReference: PreloadedQuery<UsersQuery>;
}) => {
  const fragmentRef = usePreloadedQuery<UsersQuery>(usersQuery, queryReference);

  return <UsersList fragmentRef={fragmentRef} />;
};

const getQueryFiltersSomewhere = () => {
  return {
    filters: { name: 'John', age: 30 },
    first: 10,
  };
};

export const QueryLoaderUsers = () => {
  const [queryReference, loadQuery] = useQueryLoader<UsersQuery>(usersQuery);

  return (
    <>
      <Button onClick={() => loadQuery(getQueryFiltersSomewhere())}>
        Load Users
      </Button>
      {queryReference && <PreLoadedUsers queryReference={queryReference} />}
    </>
  );
};

export const LazyLoadUsers = () => {
  const fragmentRef = useLazyLoadQuery<UsersQuery>(
    usersQuery,
    getQueryFiltersSomewhere()
  );

  return <UsersList fragmentRef={fragmentRef} />;
};
