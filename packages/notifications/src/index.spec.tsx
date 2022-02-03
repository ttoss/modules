import { act, renderHook, render, screen, userEvent } from '@ttoss/test-utils';

import { useNotifications } from './';

test('should set loading', () => {
  const { result } = renderHook(() => useNotifications());

  expect(result.current.isLoading).toBe(false);

  act(() => {
    result.current.setLoading(true);
  });

  expect(result.current.isLoading).toBe(true);

  act(() => {
    result.current.setLoading(false);
  });

  expect(result.current.isLoading).toBe(false);
});

test('should render progress bar', () => {
  const Component = () => {
    const { setLoading } = useNotifications();

    return (
      <div>
        <button onClick={() => setLoading(true)}>click</button>
      </div>
    );
  };

  render(<Component />);

  expect(screen.queryByRole('progressbar')).toBeNull();

  act(() => {
    userEvent.click(screen.getByText('click'));
  });

  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});
