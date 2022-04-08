import { Box } from '@ttoss/ui';
import { useMap } from '@ttoss/google-maps';

export const GoogleMaps = () => {
  const { ref } = useMap({
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });

  return (
    <Box
      style={{ height: '400px', width: '400px', border: '1px solid black' }}
      ref={ref}
    />
  );
};
