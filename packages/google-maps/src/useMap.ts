import * as React from 'react';

import { useGoogleMaps } from './GoogleMapsProvider';

export const useMap = (options: google.maps.MapOptions) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { googleMaps } = useGoogleMaps();

  const [isMapInitialized, setIsMapInitialized] = React.useState(false);

  /**
   * To avoid re-initializing the map because shallow object comparison.
   * https://stackoverflow.com/a/62409962/8786986
   */
  const optionsStringify = JSON.stringify(options);

  const map = React.useMemo(() => {
    if (googleMaps && ref.current) {
      const parsedOptions = JSON.parse(optionsStringify);
      const googleMapsMap = new googleMaps.Map(ref.current, parsedOptions);
      setIsMapInitialized(true);
      return googleMapsMap;
    }

    return null;
  }, [googleMaps, optionsStringify]);

  return { map, ref, isMapInitialized };
};
