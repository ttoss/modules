import { Story, Meta } from '@storybook/react';

import { useNotifications } from '@ttoss/notifications';
import { Button, Flex } from '@ttoss/ui';

export default {
  title: 'Notifications/Loading',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story = () => {
  const { setLoading, isLoading } = useNotifications();

  return (
    <Flex sx={{ flexDirection: 'column' }}>
      {JSON.stringify({ isLoading })}
      <Button onClick={() => setLoading(true)}>Loading: True</Button>
      <Button onClick={() => setLoading(false)}>Loading: False</Button>
    </Flex>
  );
};

export const Primary = Template.bind({});
