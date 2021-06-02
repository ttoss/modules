# Notifications Module

This module provides methods to create notifications in your App. `NotificationsProvider` is passed automatically by `ModulesProvider`. Currently, this module provides two kinds of notifications: loading and toast. You access this module functionalities through [`useNotifications`](#usenotifications) hook.

## API

### useNotifications

```ts
type useNotifications = () => {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  toast: Toast; // https://fkhadra.github.io/react-toastify/api/toast
};
```
