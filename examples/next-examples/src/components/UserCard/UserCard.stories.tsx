import { Meta, Story } from '@storybook/react';
import { UserCard } from './UserCard';
import { UserCardMock, UserCardMockProps } from './UserCard.mock';

export default {
  title: 'UserCard',
  component: UserCard,
} as Meta;

const Template: Story<UserCardMockProps> = (args) => <UserCardMock {...args} />;

export const Example1 = Template.bind({});
Example1.args = {
  user: {
    name: 'John Doe',
  },
};
