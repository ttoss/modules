import * as React from 'react';

import { Progress } from 'theme-ui';

const MAX_IN_MS = 1000;

const INCREMENT = 10;

const INTERVAL_IN_MS = 20;

const InfiniteHorizontalProgress = () => {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v + INCREMENT) % (MAX_IN_MS + INCREMENT));
    }, INTERVAL_IN_MS);

    return () => clearInterval(interval);
  }, []);

  return <Progress max={MAX_IN_MS} value={value} sx={{ height: '50px' }} />;
};

export default InfiniteHorizontalProgress;
