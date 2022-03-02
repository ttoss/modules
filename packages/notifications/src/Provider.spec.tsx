import { act, renderHook, render, screen, userEvent } from '@ttoss/test-utils';

import { useNotifications, TOAST_TYPES } from '.';

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

test('should render toast alert', () => {
  const toastContent = 'Toast test';

  const Component = () => {
    const { toast } = useNotifications();

    return (
      <div>
        {Object.values(TOAST_TYPES).map((toastType) => {
          return (
            <button
              key={toastType}
              onClick={() => toast(`${toastContent} - ${toastType}`)}
            >
              toast - {toastType}
            </button>
          );
        })}
      </div>
    );
  };

  render(<Component />);

  Object.values(TOAST_TYPES).forEach((toastType) => {
    act(() => {
      userEvent.click(screen.getByText(`toast - ${toastType}`));
      jest.advanceTimersByTime(100);
    });

    expect(
      screen.getByText(`${toastContent} - ${toastType}`)
    ).toBeInTheDocument();
  });
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
