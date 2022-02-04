import { getTemplate } from './cloudformation';

test('getTemplate should return a object', () => {
  expect(getTemplate()).toBeDefined();
});
