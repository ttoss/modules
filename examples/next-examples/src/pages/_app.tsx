import { AppProps } from 'next/app';
import { Providers } from '../providers';

// import '@examples/msw-api';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
};

export default App;
