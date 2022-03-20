import { AppProps } from 'next/app';
import { ThemeProvider } from '@ttoss/ui';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
