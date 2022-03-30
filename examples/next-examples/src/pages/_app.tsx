import { AppProps } from 'next/app';
import { ThemeProvider } from '@ttoss/ui';
import '@examples/msw-api';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
