import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Box } from 'theme-ui';

import InfiniteProgress from '../../components/InfiniteProgress/InfiniteProgress';

import 'react-toastify/dist/ReactToastify.css';

const NotificationsContext = React.createContext<{
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  toast: typeof toast;
}>({
  isLoading: false,
  setLoading: () => {},
  toast,
});

const NotificationsProvider: React.FC = ({ children }) => {
  const [isLoading, setLoading] = React.useState(false);

  return (
    <NotificationsContext.Provider value={{ isLoading, setLoading, toast }}>
      {children}
      {isLoading && (
        <Box sx={{ position: 'sticky', width: '100%', bottom: 0 }}>
          <InfiniteProgress />
        </Box>
      )}
      <ToastContainer />
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => React.useContext(NotificationsContext);

export default NotificationsProvider;
