import localePtBR from '../lang/pt-BR.json';
export {
  default as AuthProvider,
  useAuth,
  useIntl,
  useTranslation,
} from './AuthProvider/AuthProvider';

export { Auth } from './Auth/Auth';
export { AuthContainer } from './AuthContainer/AuthContainer';

export { localePtBR };

export * from './types';
