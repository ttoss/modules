import { render, renderHook, initStoryshots } from './';

test('methods should exist', () => {
  expect(render).toBeDefined();
  expect(renderHook).toBeDefined();
  expect(initStoryshots).toBeDefined();
});
