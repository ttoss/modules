import { Flex } from '@ttoss/ui';
import * as React from 'react';

import { InfiniteLinearProgress } from './InfiniteLinearProgress';

const NotificationsContext = React.createContext<{
  isLoading: boolean;
  // eslint-disable-next-line no-unused-vars
  setLoading: (arg: boolean) => void;
}>({
  isLoading: false,
  setLoading: () => undefined,
});

export const NotificationsProvider: React.FC = ({ children }) => {
  const [isLoading, setLoading] = React.useState(false);

  return (
    <NotificationsContext.Provider value={{ isLoading, setLoading }}>
      {isLoading && (
        <Flex sx={{ position: 'absolute', width: '100%', top: 0 }}>
          <InfiniteLinearProgress />
        </Flex>
      )}
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  return React.useContext(NotificationsContext);
};
