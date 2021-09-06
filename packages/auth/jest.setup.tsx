import { setOptions } from '@ttoss/test-utils';
import ThemeProvider from '@ttoss/ui';

const Providers: React.FC = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

setOptions({ wrapper: Providers });
