import * as allConfigs from '.';

it('configs should be exported', () => {
  expect(allConfigs.babelConfig).toBeDefined();
  expect(allConfigs.jestConfig).toBeDefined();
  expect(allConfigs.tsupConfig).toBeDefined();
});
