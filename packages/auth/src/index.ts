import localePtBR from '../lang/pt-BR.json';
export {
  default as AuthProvider,
  useAuth,
  useI18n,
} from './AuthProvider/AuthProvider';

export { Auth } from './Auth/Auth';
export { AuthContainer } from './AuthContainer/AuthContainer';

export { localePtBR };

export * from './types';
