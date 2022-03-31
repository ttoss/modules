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
  query UsersQuery($first: Int!, $after: String) {
    ...UsersList_query @arguments(first: $first, after: $after)
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

export const QueryLoaderUsers = () => {
  const [queryReference, loadQuery] = useQueryLoader<UsersQuery>(usersQuery);

  return (
    <>
      <Button onClick={() => loadQuery({ first: 10 })}>Load Users</Button>
      {queryReference && <PreLoadedUsers queryReference={queryReference} />}
    </>
  );
};

export const LazyLoadUsers = () => {
  const fragmentRef = useLazyLoadQuery<UsersQuery>(usersQuery, { first: 10 });

  return <UsersList fragmentRef={fragmentRef} />;
};
