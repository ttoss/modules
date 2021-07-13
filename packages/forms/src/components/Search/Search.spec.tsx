import * as React from 'react';

import userEvent from '@testing-library/user-event';
import { render, screen, act } from '../../testUtils';

import { Search, Results } from './Search';
import { useSearch } from './Search.hook';
import { SEARCH_TYPE_DELAY } from './Search.config';

beforeEach(() => {
  jest.resetAllMocks();
});

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

const SEARCH_DELAY = SEARCH_TYPE_DELAY + 100;

const onClickResult = jest.fn();

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('Test ', () => {
  const SearchComponent = () => {
    const searchProps = useSearch({
      onSearch: (query: string) => {
        searchProps.setResults(
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
      <Search
        {...searchProps}
        renderResults={
          <Results
            results={searchProps.results}
            onClickResult={(id) => onClickResult(id)}
          />
        }
      />
    );
  };

  test('Testing input search', async () => {
    const { getByLabelText } = render(<SearchComponent />);

    const inputSearch = getByLabelText('input-search');

    await act(async () => {
      userEvent.type(inputSearch, 'e');
    });

    await act(async () => {
      await sleep(SEARCH_DELAY);
    });

    expect(screen.getByText('Pedro')).toBeInTheDocument();
    expect(screen.getByText('Ennio')).toBeInTheDocument();
  });

  test('OnClickResult test', async () => {
    const { getByText, getByLabelText } = render(<SearchComponent />);

    const inputSearch = getByLabelText('input-search');

    await act(async () => {
      userEvent.type(inputSearch, 'ped');
    });

    await act(async () => {
      await sleep(SEARCH_DELAY);
    });

    const itemResult = getByText('Pedro');

    await act(async () => {
      userEvent.click(itemResult);
    });

    expect(onClickResult).toBeCalledWith('pedro');
  });
});
