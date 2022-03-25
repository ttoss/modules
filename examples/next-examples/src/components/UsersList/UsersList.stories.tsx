import { Meta, Story } from '@storybook/react';
import { UserListMock, UserListMockProps } from './UsersList.mock';

export default {
  title: 'UserList',
  component: UserListMock,
} as Meta;

const Template: Story<UserListMockProps> = (args) => <UserListMock {...args} />;

export const WithNextPage = Template.bind({});
WithNextPage.args = {
  usersConnection: {
    pageInfo: {
      hasNextPage: true,
    },
  },
};

export const WithoutNextPage = Template.bind({});
WithoutNextPage.args = {
  usersConnection: {
    pageInfo: {
      hasNextPage: false,
    },
  },
};
