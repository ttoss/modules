import React from 'react';
import { Meta } from '@storybook/react';

import { useSearch } from '../../hooks/useSearch';
import { Search } from '.';

const SearchComponent: Meta = {
  title: 'Modules Components/Search',
  component: Search,
};

export default SearchComponent;

const names = ['Rayza', 'Vitor', 'Pedro', 'Ennio'];

export const Example = () => {
  const search = useSearch({
    onSearch: (query) => {
      // call API
      console.log(query);

      search.setResults(
        names
          .filter((name) => name.toLowerCase().includes(query.toLowerCase()))
          .map((n, idx) => ({
            id: idx,
            value: n,
          }))
      );
    },
  });

  return (
    <div>
      <pre>{JSON.stringify(names, undefined, 2)}</pre>
      <Search {...search} />
    </div>
  );
};
