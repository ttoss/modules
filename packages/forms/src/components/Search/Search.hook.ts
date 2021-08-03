import React from 'react';
import { OnSearch, Results } from './Search.types';

export const useSearch = ({ onSearch }: { onSearch: OnSearch }) => {
  const ref = React.useRef<HTMLInputElement>(null);

  const [results, setResults] = React.useState<Results>(null);

  const clear = React.useCallback(() => {
    setResults(null);

    if (ref.current) {
      ref.current.value = '';
    }
  }, []);

  return { onSearch, results, setResults, clear, ref };
};
