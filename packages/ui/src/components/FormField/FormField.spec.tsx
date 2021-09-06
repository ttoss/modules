import { customRender, screen } from '@ttoss/test-utils';

import Input from '../Input/Input';

import FormField from './FormField';

const label = 'Label';
const value = 'Value';

test('check if label is rendered on screen', () => {
  customRender(
    <FormField label={label}>
      <Input defaultValue={value} />
    </FormField>
  );

  expect(screen.getByText(label)).toBeInTheDocument();
});

test('check if label is associated with input', () => {
  customRender(
    <FormField label={label}>
      <Input defaultValue={value} />
    </FormField>
  );

  expect(screen.getByLabelText(label)).toHaveValue(value);
});

test('check if renders a single error', () => {
  const error = 'Error';

  customRender(
    <FormField label={label} error={error}>
      <Input defaultValue={value} />
    </FormField>
  );

  expect(screen.getByText(error)).toBeInTheDocument();
});

test('check if renders multiple errors', () => {
  const errors = ['Error1', 'Error2', 'Error3'];

  customRender(
    <FormField label={label} error={errors}>
      <Input defaultValue={value} />
    </FormField>
  );

  errors.forEach((error) => {
    expect(screen.getByText(error)).toBeInTheDocument();
  });
});
