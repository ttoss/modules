import { act, render, renderHook, screen } from '@ttoss/test-utils';

import {
  I18nProvider,
  useI18n,
  defineMessage,
  defineMessages,
  FormattedMessage,
} from '.';
import { DEFAULT_LOCALE } from './i18Provider';

const messages = defineMessages({
  myNameIs: {
    description: 'My name is',
    defaultMessage: 'My name is {name}.',
  },
  otherMessage: {
    description: 'Other message',
    defaultMessage: 'Other message',
  },
});

let languageGetter: jest.SpyInstance;

beforeEach(() => {
  languageGetter = jest.spyOn(window.navigator, 'language', 'get');
  languageGetter.mockReturnValue('en');
});

test('should export components', () => {
  expect(I18nProvider).toBeDefined();
  expect(useI18n).toBeDefined();
  expect(defineMessage).toBeDefined();
  expect(defineMessages).toBeDefined();
});

test('defaultLocale must be defined', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useI18n());

  /**
   * Wait for loadLocaleData finishes.
   */
  await waitForNextUpdate();

  expect(result.current.defaultLocale).toBe(DEFAULT_LOCALE);
});

test('locale must be equal of the browser', async () => {
  languageGetter.mockReturnValue('pt-BR');

  const { result, waitForNextUpdate } = renderHook(() => useI18n());

  await waitForNextUpdate();

  expect(result.current.locale).toBe('pt-BR');
});

test('formatMessage - default message', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useI18n());

  await waitForNextUpdate();

  const message = result.current.intl.formatMessage(messages.myNameIs, {
    name: 'John Doe',
  });

  expect(message).toBe('My name is John Doe.');
});

test('formatMessage - pt-BR', async () => {
  languageGetter.mockReturnValue('pt-BR');

  const { result, waitForNextUpdate } = renderHook(() => useI18n());

  await waitForNextUpdate();

  expect(
    result.current.intl.formatMessage(messages.myNameIs, {
      name: 'John Doe',
    })
  ).toBe('Meu nome é John Doe.');
});

test('formatMessage - change en -> pt-BR -> en', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useI18n());

  await waitForNextUpdate();

  expect(result.current.locale).toBe('en');
  expect(result.current.intl.formatMessage(messages.otherMessage)).toBe(
    'Other message'
  );

  act(() => {
    result.current.setLocale('pt-BR');
  });

  await waitForNextUpdate();

  expect(result.current.locale).toBe('pt-BR');
  expect(result.current.intl.formatMessage(messages.otherMessage)).toBe(
    'Outra mensagem'
  );

  act(() => {
    result.current.setLocale('en');
  });

  await waitForNextUpdate();

  expect(result.current.locale).toBe('en');
  expect(result.current.intl.formatMessage(messages.otherMessage)).toBe(
    'Other message'
  );
});

test('FormattedMessage component', async () => {
  const Component = () => {
    return (
      <FormattedMessage {...messages.myNameIs} values={{ name: 'Pedro' }} />
    );
  };

  render(<Component />);

  /**
   * https://testing-library.com/docs/dom-testing-library/api-async/#findby-queries
   */
  expect(await screen.findByText('My name is Pedro.')).toBeInTheDocument();
});
