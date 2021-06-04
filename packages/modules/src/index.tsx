export { default as Amplify } from 'aws-amplify';

export { default as ModulesProvider } from './providers/ModulesProvider';

export { AuthProvider, Auth, useAuth } from './modules/auth';

export { Form, yup, yupResolver, useForm } from './modules/forms';

export { useNotifications } from './modules/notifications';
