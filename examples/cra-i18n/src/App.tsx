import { useI18n, defineMessages } from '@ttoss/i18n';
import { Box, Text } from '@ttoss/ui';

const Language = () => {
  const { setLocale, locale } = useI18n();

  return (
    <div>
      <p>Selected locale: {locale}</p>
      <button onClick={() => setLocale('pt-BR')}>pt-BR</button>
      <button onClick={() => setLocale('en-US')}>en-US</button>
    </div>
  );
};

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

const Content = () => {
  const { intl } = useI18n();

  return (
    <Box>
      <Text>
        {intl.formatMessage(messages.myNameIs, {
          name: 'Rayza',
        })}
      </Text>
    </Box>
  );
};

const App = () => {
  return (
    <Box>
      <Language />
      <Content />
    </Box>
  );
};

export default App;
