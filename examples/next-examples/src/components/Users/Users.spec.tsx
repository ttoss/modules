import {
  MockPayloadGenerator,
  createMockEnvironment,
} from '@ttoss/test-utils/dist/relay';
import {
  QueryLoaderUsers,
  getQueryFiltersSomewhere,
  usersQuery,
} from './Users';
import { RelayEnvironmentProvider } from 'react-relay';
import { act, render, screen, userEvent } from '@ttoss/test-utils';
import { faker } from '@ttoss/test-utils/dist/faker';

test('check if users list render a single card', async () => {
  /**
   * Follow the steps below to create a mock environment for preloaded query.
   * https://relay.dev/docs/guides/testing-relay-with-preloaded-queries/
   */
  const environment = createMockEnvironment();

  const userName = faker.name.firstName();

  environment.mock.queueOperationResolver((operation) => {
    return MockPayloadGenerator.generate(operation, {
      String: (context) => {
        /**
         * Mock only the name field of the User type.
         */
        if (context.name === 'name' && context.parentType === 'User') {
          return userName;
        }

        return '';
      },
    });
  });

  environment.mock.queuePendingOperation(
    usersQuery,
    getQueryFiltersSomewhere()
  );

  render(
    <RelayEnvironmentProvider environment={environment}>
      <QueryLoaderUsers />
    </RelayEnvironmentProvider>
  );

  act(() => {
    const button = screen.getByText('Load Users');
    userEvent.click(button);
  });

  const card = await screen.findByText(userName);

  expect(card).toBeInTheDocument();
});
