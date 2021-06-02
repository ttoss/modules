import * as React from 'react';

import NotificationsProvider from '../modules/notifications/NotificationsProvider';

const ModulesProvider: React.FC = ({ children }) => {
  return <NotificationsProvider>{children}</NotificationsProvider>;
};

export default ModulesProvider;
