import { PreloadedQuery, usePreloadedQuery, useQueryLoader } from 'react-relay';
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

export const Users = () => {
  const [queryReference, loadQuery] = useQueryLoader<UsersQuery>(usersQuery);

  if (!queryReference) {
    return null;
  }

  return <PreLoadedUsers queryReference={queryReference} />;
};
