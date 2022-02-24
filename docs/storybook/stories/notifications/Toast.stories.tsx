import { Story, Meta } from '@storybook/react';

import { useNotifications } from '@ttoss/notifications/src';
import { Button, Flex } from '@ttoss/ui';

export default {
  title: 'Notifications/Toast',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story = () => {
  const { toast } = useNotifications();

  return (
    <Flex sx={{ flexDirection: 'column', gap: 3 }}>
      <Button onClick={() => toast('Toast DEFAULT')}>Default toast</Button>

      <Button onClick={() => toast('Toast ERROR', { type: toast.TYPE.ERROR })}>
        Toast ERROR
      </Button>

      <Button onClick={() => toast('Toast INFO', { type: toast.TYPE.INFO })}>
        Toast INFO
      </Button>

      <Button
        onClick={() => toast('Toast SUCCESS', { type: toast.TYPE.SUCCESS })}
      >
        Toast SUCCESS
      </Button>

      <Button
        onClick={() => toast('Toast WARNING', { type: toast.TYPE.WARNING })}
      >
        Toast WARNING
      </Button>
    </Flex>
  );
};

export const Primary = Template.bind({});
