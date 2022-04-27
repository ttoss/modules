import * as React from 'react';
import { Flex, useTheme } from '@ttoss/ui';
import { ToastContainer, ToastContainerProps, toast } from 'react-toastify';

import { InfiniteLinearProgress } from './InfiniteLinearProgress';

import 'react-toastify/dist/ReactToastify.css';

const NotificationsContext = React.createContext<{
  isLoading: boolean;
  // eslint-disable-next-line no-unused-vars
  setLoading: (arg: boolean) => void;
  toast: typeof toast;
}>({
  isLoading: false,
  setLoading: () => undefined,
  toast,
});

export type NotificationsProviderProps = ToastContainerProps & {
  children: React.ReactNode;
};

export const NotificationsProvider = ({
  children,
  ...props
}: NotificationsProviderProps) => {
  const [isLoading, setLoading] = React.useState(false);

  const { theme } = useTheme();

  return (
    <NotificationsContext.Provider value={{ isLoading, setLoading, toast }}>
      {isLoading && (
        <Flex sx={{ position: 'absolute', width: '100%', top: 0 }}>
          <InfiniteLinearProgress />
        </Flex>
      )}
      {children}
      <ToastContainer
        {...props}
        toastStyle={{
          color: theme.colors?.text as string,
          backgroundColor: theme.colors?.background as string,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          fontFamily: (theme.fonts as any)?.heading as string,
        }}
      />
    </NotificationsContext.Provider>
  );
};

export const TOAST_TYPES: typeof toast.TYPE = toast.TYPE;

export const useNotifications = () => {
  return React.useContext(NotificationsContext);
};
