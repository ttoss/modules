import React from 'react';
import { OnSearch, Results, OnClickResult } from 'src/models/search';

export const useSearch = ({
  onSearch,
  onClickResult,
}: {
  onSearch: OnSearch;
  onClickResult?: OnClickResult;
}) => {
  const ref = React.useRef<HTMLInputElement>(null);

  const [results, setResults] = React.useState<Results>(null);

  const clear = React.useCallback(() => {
    setResults(null);

    if (ref.current) {
      ref.current.value = '';
    }
  }, []);

  return { onSearch, results, setResults, clear, ref, onClickResult };
};
