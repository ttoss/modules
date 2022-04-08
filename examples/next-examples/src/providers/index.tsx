import { GoogleMapsProvider } from '@ttoss/google-maps';
import { RelayProvider } from './RelayProvider';
import { ThemeProvider } from '@ttoss/ui';
import { env } from '@examples/env';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <GoogleMapsProvider apiKey={env.GOOGLE_MAPS_API_KEY}>
        <RelayProvider>
          <>{children}</>
        </RelayProvider>
      </GoogleMapsProvider>
    </ThemeProvider>
  );
};
