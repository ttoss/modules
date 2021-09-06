import { setOptions } from '@ttoss/test-utils';

import ThemeProvider from './src/theme/ThemeProvider';

const Providers: React.FC = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

setOptions({ wrapper: Providers });
