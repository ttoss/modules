import { UserCardMock } from './UserCard.mock';
import { faker } from '@ttoss/test-utils/dist/faker';
import { render, screen } from '@ttoss/test-utils';

it('should display user name', async () => {
  const username = 'John Doe';

  render(<UserCardMock user={{ name: username }} />);

  /**
   * We use `screen.findByText` instead of `screen.getByText` because the
   * mocked component has a `useEffect` when it renders.
   * https://testing-library.com/docs/dom-testing-library/api-async/
   */
  expect(await screen.findByText(username)).toBeInTheDocument();
});

const randomNames = [...new Array(10)].map(() => [faker.name.findName()]);

it.each(randomNames)(
  'should display a random user name: %s',
  async (username) => {
    render(<UserCardMock user={{ name: username }} />);
    expect(await screen.findByText(username)).toBeInTheDocument();
  }
);
