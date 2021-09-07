import * as React from 'react';

import { useMap } from '@ttoss/google-maps';

const App = () => {
  const { map, ref } = useMap({
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });

  console.log(map);

  const [zoom, setZoom] = React.useState(8);

  React.useEffect(() => {
    map?.setZoom(zoom);
  }, [zoom]);

  React.useEffect(() => {
    setInterval(() => {
      setZoom((z) => (z === 8 ? 10 : 8));
    }, 3000);
  }, [setZoom]);

  return (
    <>
      <div
        style={{ height: '400px', width: '400px', border: '1px solid black' }}
        ref={ref}
      />
      <span>Status: {status}</span>
    </>
  );
};

export default App;
