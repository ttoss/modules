import React from 'react';
import { Meta } from '@storybook/react';

import { useSearch } from './Search.hook';
import { Search, Results } from './Search';

const SearchComponent: Meta = {
  title: 'Modules Components/Search',
  component: Search,
};

export default SearchComponent;

const names = [
  'Rayza',
  'Vitor',
  'Pedro',
  'Ennio',
  'Joao',
  'Julia',
  'Marcos',
  'Carol',
  'Mario',
];

export const Example = () => {
  const search = useSearch({
    onSearch: (query) => {
      // call API
      console.log(query);

      search.setResults(
        names
          .filter((name) => name.toLowerCase().includes(query.toLowerCase()))
          .map((n) => ({
            id: n.toLowerCase(),
            value: n,
          }))
      );
    },
  });

  return (
    <div>
      <pre>{JSON.stringify(names, undefined, 2)}</pre>
      <Search
        {...search}
        renderResults={
          <Results results={search.results} onClickResult={(id) => alert(id)} />
        }
      />
    </div>
  );
};
