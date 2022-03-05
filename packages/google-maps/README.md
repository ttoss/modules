# @ttoss/google-maps

## 📚 About

<strong> @ttoss/google-maps</strong> is a easiest way to use Google Maps in your React application.

## 🚀 Get Started

### Install @ttoss/google-maps

```shell
$ yarn add
# or
$ npm install @ttoss/google-maps
```

## 📄 Examples of use

### Map

```tsx
export type MapProps = {
  width?: number | string;
  height?: number | string;
  image?: Omit<MapImageOptions, 'map'>;
  options?: google.maps.MapOptions;
};

const Map = ({ height, width, image, options }: MapProps) => {
  const { googleMaps } = useGoogleMaps();

  const [mapDivRef, setMapDivRef] = React.useState<HTMLDivElement | null>(null);

  const map = React.useMemo(() => {
    if (googleMaps && mapDivRef) {
      const googleMapsMap = new googleMaps.Map(mapDivRef, defaultOptions);
      return googleMapsMap;
    }

    return null;
  }, [googleMaps, mapDivRef]);

  React.useEffect(() => {
    if (map && options?.center) {
      map.setCenter(options.center);
    }
  }, [map, options?.center]);

  return (
    <div id="google-maps" ref={(r) => setMapDivRef(r)} sx={{ width, height }} />
  );
};

Map.defaultProps = {
  width: 400,
  height: 300,
} as MapProps;

export default Map;
```

### Latitude and Longitude

```ts
import { useGeocoder } from '@ttoss/google-maps';

type MapGeocoderResult = google.maps.GeocoderResult;
type MapGeocoderStatus = google.maps.GeocoderStatus;

export type LatLng = {
  lat: number;
  lng: number;
};

export const useGeocoding = () => {
  const { geocoder } = useGeocoder();

  const getLatLong = ({ address }: { address: string }): Promise<LatLng> => {
    return new Promise((resolve, reject) => {
      if (!geocoder) {
        return reject(new Error('Geocoder not defined'));
      }

      geocoder.geocode(
        { address },
        (results: MapGeocoderResult[] | null, status: MapGeocoderStatus) => {
          if (results && status === window.google.maps.GeocoderStatus.OK) {
            const lat = results[0].geometry.location.lat();
            const lng = results[0].geometry.location.lng();

            return resolve({
              lat,
              lng,
            });
          } else {
            console.log(
              'Geocode was not successful for the following reason: ',
              status
            );
            return reject(new Error('Result not found'));
          }
        }
      );
    });
  };

  return { getLatLong };
};
```

### Providers

```tsx
import * as React from 'react';

import { GoogleMapsProvider } from '@ttoss/google-maps';

const Providers: React.FC = ({ children }) => {
  const apiKey = 'YOUR_API_KEY';

  if (!apiKey) {
    return <>{children}</>;
  }

  return (
    <GoogleMapsProvider apiKey={apiKey} libraries={['places']} language="pt-BR">
      {children}
    </GoogleMapsProvider>
  );
};

export default Providers;
```

### Autocomplete

```tsx
import React from 'react';

import { usePlacesAutocomplete } from '@ttoss/google-maps';

const Component = () => {
  const [text, setText] = React.useState('');
  const clearText = () => setText('');

  const apiKey = 'YOUR_API_KEY';

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
    cacheKey: apiKey,
  });

  const handleInput = (e: any) => {
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }: { description: string }) =>
    () => {
      setValue(description, false);
      clearSuggestions();
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={() => handleSelect(suggestion)}>
          <strong>{main_text}</strong>

          <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div>
      <input value={value} onChange={handleInput} disabled={!ready} />

      {status === 'OK' && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};

export default Component;
```

## 📘 Types

```ts
import { ScriptStatus } from '@ttoss/hooks';

const useMap: (options: google.maps.MapOptions) => {
  map: google.maps.Map | null;
  ref: React.RefObject<HTMLDivElement>;
  isMapInitialized: boolean;
};

const useGeocoder: () => {
  geocoder: google.maps.Geocoder | null;
  isGeocoderInitialized: boolean;
};

type Libraries = 'places' | 'visualization' | 'drawing' | 'geometry';

type Extends<T, U extends T> = U;

type LoadedMapsStatus = Extends<ScriptStatus, 'ready'>;

type NotLoadedMapStatus = Extends<ScriptStatus, 'idle' | 'error' | 'loading'>;

export type GoogleMaps = typeof google.maps;

const GoogleMapsProvider: React.FC<{
  apiKey: string;
  libraries?: Libraries[] | undefined;
  language?: string;
}>;

const useGoogleMaps: () =>
  | {
      status: LoadedMapsStatus;
      googleMaps: GoogleMaps;
    }
  | {
      status: NotLoadedMapStatus;
      googleMaps: null;
    };
```

---

## 💻 For more information

- **[ Platform Google Maps Documentation](https://developers.google.com/maps/documentation/javascript/overview)**

<br/>

<h4 align="center">
    Special thanks for the inspiring <a href="https://github.com/jmarceli/react-hook-google-maps">react-hook-google-maps</a> and <a href="https://github.com/wellyshen/use-places-autocomplete">use-places-autocomplete</a> documentation.
</h4>
