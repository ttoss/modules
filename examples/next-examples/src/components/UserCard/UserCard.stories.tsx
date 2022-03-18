/* eslint-disable */
import { UserCard } from './UserCard';
import { Meta, Story } from '@storybook/react';
import { useLazyLoadQuery, RelayEnvironmentProvider } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import { UserCardQuery } from './__generated__/UserCardQuery.graphql';
import {
  createMockEnvironment,
  MockPayloadGenerator,
} from '@ttoss/test-utils/dist/relay';
import * as React from 'react';

export default {
  title: 'UserCard',
  component: UserCard,
} as Meta;

const UserCardContainer = () => {
  const data = useLazyLoadQuery<UserCardQuery>(
    graphql`
      query UserCardQuery @relay_test_operation {
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

const Template: Story = () => {
  const environment = createMockEnvironment();

  React.useEffect(() => {
    environment.mock.resolveMostRecentOperation((operation) =>
      MockPayloadGenerator.generate(operation, {
        User() {
          return {
            id: 4,
            name: 'Mark',
            profile_picture: {
              uri: 'http://my-image...',
            },
          };
        },
      })
    );
  }, []);

  return (
    <RelayEnvironmentProvider environment={environment}>
      <React.Suspense fallback="loading...">
        <UserCardContainer />
      </React.Suspense>
    </RelayEnvironmentProvider>
  );
};

export const Example1 = Template.bind({});
