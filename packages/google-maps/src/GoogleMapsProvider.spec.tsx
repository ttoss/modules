// import { renderHook, act } from '@testing-library/react-hooks';
// import { useGoogleMaps } from '..';

// const mapObject = { map: 'object' };
// const googleMock = {
//   maps: {
//     Map: jest.fn().mockImplementation(() => mapObject),
//   },
// };

import { act, render, screen } from '@ttoss/test-utils';

import { GoogleMapsProvider, useGoogleMaps } from './';

const mapObject = { map: 'object' };
const googleMock = {
  maps: {
    Map: jest.fn().mockImplementation(() => mapObject),
  },
};

beforeAll(() => {
  (global.google as unknown) = googleMock;
});

const RenderStatus = () => {
  const { status } = useGoogleMaps();
  return (
    <div>
      <span>{status}</span>
    </div>
  );
};

const loadEvent = new Event('load');

it('should display correct status', () => {
  render(
    <GoogleMapsProvider apiKey="apiKey">
      <RenderStatus />
    </GoogleMapsProvider>
  );

  expect(screen.getByText('loading')).toBeInTheDocument();

  act(() => {
    document.querySelectorAll('script')[0].dispatchEvent(loadEvent);
  });

  expect(screen.getByText('ready')).toBeInTheDocument();
});
