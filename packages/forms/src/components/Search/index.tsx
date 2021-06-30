import React from 'react';
import { OnSearch, Results } from '../../models/search';

import { Input, Button } from 'theme-ui';

type SearchProps = {
  onSearch: OnSearch;
  results: Results;
  setResults: (results: Results) => void;
  clear: () => void;
};

export const Search = React.forwardRef<any, SearchProps>(
  ({ onSearch, results, clear }, ref) => {
    // TODO: fazer função de onClickResult para quando clicar em um resultado

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Input onChange={(e) => onSearch(e.target.value)} ref={ref} />
        {/* TODO: Colocar botão como ícone dentro do input */}
        <Button onClick={clear}>clear</Button>
        {/* TODO: Criar lista estilizada de resultados */}
        <ul>
          {results?.map((item) => (
            <li key={item.id}>{item.value}</li>
          ))}
        </ul>
      </div>
    );
  }
);
