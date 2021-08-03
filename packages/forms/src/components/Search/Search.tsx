import React from 'react';
import { useDebounce } from 'use-debounce';

import { InlineIcon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import searchFill from '@iconify/icons-eva/search-fill';

import { Input, Box, Flex, Text } from 'theme-ui';

import { OnSearch, Results as ResultsModel } from './Search.types';
import { SEARCH_TYPE_DELAY } from './Search.config';

type ResultsProps = {
  results: ResultsModel;
  onClickResult: (idResult: string | number) => void;
};

export const Results = ({ results, onClickResult }: ResultsProps) => {
  return (
    <>
      {results?.slice(0, 15).map((result) => (
        <Text
          sx={{
            cursor: 'pointer',
            paddingX: '8px',
            paddingY: 1,
            marginY: 2,
            overflowWrap: 'break-word',
          }}
          key={result.id}
          onClick={() => onClickResult(result.id)}
        >
          <Text sx={{ marginRight: '8px' }}>
            <InlineIcon icon={searchFill} />
          </Text>
          {result.value}
        </Text>
      ))}
    </>
  );
};

type SearchProps = {
  onSearch: OnSearch;
  results: ResultsModel;
  setResults: (results: ResultsModel) => void;
  clear: () => void;
  renderResults: React.ReactNode;
};

export const Search = React.forwardRef<any, SearchProps>(
  ({ onSearch, results, clear, renderResults }, ref) => {
    const [text, setText] = React.useState<string>('');
    const [query, debounce] = useDebounce(text, SEARCH_TYPE_DELAY);

    React.useEffect(() => {
      if (query) {
        onSearch(query);
      }
    }, [query]);

    const onClear = React.useCallback(() => {
      setText('');
      debounce.flush();
      clear();
    }, [debounce]);

    return (
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 2,
        }}
      >
        <Box>
          <Flex sx={{ alignItems: 'center' }}>
            <Text sx={{ marginRight: '8px' }}>
              <InlineIcon icon={searchFill} />
            </Text>
            <Input
              onChange={(e) => setText(e.target.value)}
              value={text}
              ref={ref}
              aria-label="input-search"
              sx={{ position: 'relative' }}
            />
            <Text
              sx={{ marginLeft: '8px', cursor: 'pointer' }}
              onClick={onClear}
            >
              <InlineIcon icon={closeFill} />
            </Text>
          </Flex>

          <Flex
            sx={{
              flexDirection: 'column',
              position: 'absolute',
              width: 'calc(100% - 48px)',
              maxHeight: '300px',
              overflowY: 'auto',
              right: '24px',
              zIndex: 1,
              marginTop: '2px',
              border:
                results && results?.length > 0 ? '1px solid #333' : undefined,
              borderRadius: '4px',
            }}
          >
            {renderResults}
          </Flex>
        </Box>
      </Box>
    );
  }
);
