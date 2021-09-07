import { useScript, ScriptStatus } from '@ttoss/hooks';
import * as React from 'react';

type Extends<T, U extends T> = U;

export type GoogleMaps = typeof google.maps;

type LoadedMapsStatus = Extends<ScriptStatus, 'ready'>;

type NotLoadedMapStatus = Extends<ScriptStatus, 'idle' | 'error' | 'loading'>;

const GoogleMapsContext = React.createContext<
  | {
      status: LoadedMapsStatus;
      googleMaps: GoogleMaps;
    }
  | {
      status: NotLoadedMapStatus;
      googleMaps: null;
    }
>({
  status: 'idle',
  googleMaps: null,
});

type Libraries = 'places' | 'visualization' | 'drawing' | 'geometry';

export const GoogleMapsProvider: React.FC<{
  apiKey: string;
  libraries?: Libraries[];
}> = ({ children, apiKey, libraries }) => {
  const src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${libraries?.join(
    ','
  )}`;

  const { status } = useScript(src);

  const googleMaps = React.useMemo(() => {
    if (status === 'ready' && window.google.maps) {
      return window.google.maps;
    }

    return null;
  }, [status]);

  const value = React.useMemo(() => {
    if (status === 'ready' && googleMaps) {
      return {
        status,
        googleMaps,
      };
    }

    return {
      status: status as NotLoadedMapStatus,
      googleMaps: null,
    };
  }, [googleMaps, status]);

  return (
    <GoogleMapsContext.Provider value={value}>
      {children}
    </GoogleMapsContext.Provider>
  );
};

/**
 *
 * @returns param.googleMaps: GoogleMaps - returns the google maps object which
 * provides access to the [Google Maps API](https://developers.google.com/maps/documentation/javascript/overview).
 */
export const useGoogleMaps = () => React.useContext(GoogleMapsContext);
