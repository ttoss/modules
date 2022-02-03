import { getTemplate } from './cloudformation';

test('test 1', () => {
  expect(getTemplate()).toBeDefined();
});
