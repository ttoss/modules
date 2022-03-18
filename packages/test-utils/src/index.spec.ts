import { render, renderHook, initStoryshots, faker } from './';

test('methods should exist', () => {
  expect(render).toBeDefined();
  expect(renderHook).toBeDefined();
  expect(initStoryshots).toBeDefined();
});

test('should define window.matchMedia', () => {
  expect(window.matchMedia).toBeDefined();
});

test('faker should exist', () => {
  expect(faker).toBeDefined();
});
