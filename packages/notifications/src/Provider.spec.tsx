import { NotificationsProvider } from './Provider';
import { TOAST_TYPES, useNotifications } from '.';
import { act, render, renderHook, screen, userEvent } from '@ttoss/test-utils';

test('should set loading', () => {
  const { result } = renderHook(() => useNotifications(), {
    wrapper: NotificationsProvider,
  });

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

test.each(Object.values(TOAST_TYPES))(
  'should render toast alert %#',
  async (toastType) => {
    const toastContent = 'Toast test';

    const user = userEvent.setup({ delay: null });

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

    render(<Component />, { wrapper: NotificationsProvider });

    await act(async () => {
      await user.click(screen.getByText(`toast - ${toastType}`));
      jest.advanceTimersByTime(100);
    });

    expect(
      screen.getByText(`${toastContent} - ${toastType}`)
    ).toBeInTheDocument();
  }
);

test('should render progress bar', async () => {
  const user = userEvent.setup({ delay: null });

  const Component = () => {
    const { setLoading } = useNotifications();

    return (
      <div>
        <p>aaaaaaaa</p>
        <button onClick={() => setLoading(true)}>click</button>
      </div>
    );
  };

  render(<Component />, { wrapper: NotificationsProvider });

  expect(screen.queryByRole('progressbar')).toBeNull();

  await act(async () => {
    await user.click(await screen.findByText('click'));
  });

  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});
