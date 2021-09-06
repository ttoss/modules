import { Meta, Story } from '@storybook/react';
import { FormField, FormFieldProps, Input } from '@ttoss/ui';

export default {
  title: 'Ui/FormField',
  component: FormField,
  args: { label: 'Some Label' },
} as Meta;

const Template: Story<FormFieldProps> = (args) => (
  <FormField {...args}>
    <Input />
  </FormField>
);

export const WithoutError = Template.bind({});

export const WithSingleError = Template.bind({});
WithSingleError.args = { error: 'This is an error' };

export const WithMultipleErrors = Template.bind({});
WithMultipleErrors.args = {
  error: ['This is an error', 'This is another error.'],
};
