import { renderHookAct, renderHook } from '@ttoss/test-utils';

import { useScript } from './useScript';

const googleMock = {};
const windowMock = { ...window, google: googleMock };
const loadEvent = new Event('load');

it('should load script', () => {
  /**
   * Arrange
   */
  const windowSpy = jest.spyOn(global as any, 'window', 'get');

  const src = 'https://maps.googleapis.com/maps/api/js?key=GOOGLE_MAPS_API_KEY';

  const { result } = renderHook(() => useScript(src));

  /**
   * Act
   */
  renderHookAct(() => {
    windowSpy.mockImplementation(() => windowMock);
    document.querySelectorAll('script')[0].dispatchEvent(loadEvent);
  });

  /**
   * Assert
   */
  expect(document.querySelectorAll('script')[0].getAttribute('src')).toBe(src);
  expect(result.current.status).toBe('ready');

  /**
   * Cleanup
   */
  windowSpy.mockRestore();
});
