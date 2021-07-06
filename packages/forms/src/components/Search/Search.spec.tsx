import * as React from 'react';

import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { render, screen, act } from '../../testUtils';

import { Search, Results } from '.';
import { useSearch } from '../../hooks/useSearch';

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

const onClickResult = jest.fn();

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('Test ', () => {
  const { result } = renderHook(() =>
    useSearch({
      onSearch: (query: string) => {
        console.log(query);

        result.current.setResults(
          names
            .filter((name) => name.toLowerCase().includes(query.toLowerCase()))
            .map((n) => ({
              id: n.toLowerCase(),
              value: n,
            }))
        );
      },
    })
  );

  beforeEach(() => {
    render(
      <Search
        {...result.current}
        renderResults={
          <Results
            results={result.current.results}
            onClickResult={(id) => onClickResult(id)}
          />
        }
      />
    );
  });

  test('Testing input search', async () => {
    const inputSearch = screen.getByLabelText('input-search');

    await act(async () => {
      userEvent.type(inputSearch, 'e');
    });

    await act(async () => {
      await sleep(1000);
    });

    expect(result.current?.results?.length).toEqual(2);

    expect(result.current?.results?.map((item) => item.value)).toContain(
      'Pedro'
    );
    expect(result.current?.results?.map((item) => item.value)).toContain(
      'Ennio'
    );
  });

  test('OnClickResult test', async () => {
    const itemResult = screen.getByText('Pedro');

    await act(async () => {
      userEvent.click(itemResult);
    });

    expect(onClickResult).toBeCalledWith('pedro');
  });
});
