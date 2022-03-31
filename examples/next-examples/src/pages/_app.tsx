import { AppProps } from 'next/app';
import { RelayProvider } from '../providers/RelayProvider';
import { ThemeProvider } from '@ttoss/ui';
import '@examples/msw-api';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <RelayProvider>
        <Component {...pageProps} />
      </RelayProvider>
    </ThemeProvider>
  );
};

export default App;
