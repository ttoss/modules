import React from 'react';
import { OnSearch, Results } from '../../models/search';
import { useDebounce } from 'use-debounce';

import { InlineIcon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import searchFill from '@iconify/icons-eva/search-fill';

import { Input, Box, Flex, Text } from 'theme-ui';

type SearchProps = {
  onSearch: OnSearch;
  results: Results;
  setResults: (results: Results) => void;
  onClickResult: (idResult: string | number) => void;
  clear: () => void;
};

export const Search = React.forwardRef<any, SearchProps>(
  ({ onSearch, onClickResult, results, clear }, ref) => {
    const [text, setText] = React.useState<string>('');
    const [query, debounce] = useDebounce(text, 500);

    React.useEffect(() => {
      if (query) {
        onSearch(query);

        console.log('debouce::', query);
      }
    }, [query]);

    React.useEffect(() => {
      if (text) {
        console.log('text::', text);
      }
    }, [text]);

    const onClear = React.useCallback(() => {
      setText('');
      debounce.flush();
      clear();
    }, [debounce]);

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Flex sx={{ alignItems: 'center' }}>
          <Text sx={{ marginRight: '8px' }}>
            <InlineIcon icon={searchFill} />
          </Text>
          <Input
            onChange={(e) => setText(e.target.value)}
            value={text}
            ref={ref}
          />
          <Text sx={{ marginLeft: '8px', cursor: 'pointer' }} onClick={onClear}>
            <InlineIcon icon={closeFill} />
          </Text>
        </Flex>

        {/* TODO: Criar lista estilizada de resultados */}
        <ul>
          {results?.map((item) => (
            <li key={item.id} onClick={() => onClickResult(item.id)}>
              {item.value}
            </li>
          ))}
        </ul>
      </Box>
    );
  }
);
