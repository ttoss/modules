import React from 'react';

import { useTranslation, useIntl } from '@ttoss/i18n';
import { Input, Box, Flex, Button } from '@ttoss/ui';

const App = () => {
  const { formatMessage } = useIntl();
  const { changeLanguage } = useTranslation();

  const [name, setName] = React.useState('Rayza');

  return (
    <Box sx={{ padding: 8 }}>
      <Flex sx={{ padding: 2 }}>
        <Button sx={{ marginRight: 3 }} onClick={() => changeLanguage('en-US')}>
          en-US
        </Button>

        <Button onClick={() => changeLanguage('pt-BR')}>pt-BR</Button>
      </Flex>

      <Input value={name} onChange={(e) => setName(e.target.value)} />

      <h3>{formatMessage({ id: 'welcome' }, { name })}</h3>
    </Box>
  );
};

export default App;
