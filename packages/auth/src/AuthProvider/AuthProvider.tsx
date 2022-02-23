import { Auth, Hub } from 'aws-amplify';
import * as React from 'react';

import {
  I18nProvider,
  I18nProviderProps,
  useIntl,
  useTranslation,
} from '@ttoss/i18n';

import { defaultTranslations } from '../locale/locale';

type User = {
  id: string;
  email: string;
  emailVerified: string;
} | null;

type Tokens = {
  idToken: string;
  accessToken: string;
  refreshToken: string;
} | null;

const signOut = () => Auth.signOut();

const AuthContext = React.createContext<{
  signOut: () => Promise<any>;
  isAuthenticated: boolean;
  user: User;
  tokens: Tokens;
}>({
  signOut,
  isAuthenticated: false,
  user: null,
  tokens: null,
});

type AuthProviderProps = {
  translations?: I18nProviderProps['translations'];
  initialLocale?: I18nProviderProps['initialLocale'];
};

const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  initialLocale,
  translations,
}) => {
  const [user, setUser] = React.useState<User>(null);

  const [tokens, setTokens] = React.useState<Tokens>(null);

  React.useEffect(() => {
    const updateUser = () => {
      Auth.currentAuthenticatedUser()
        .then(({ attributes, signInUserSession }) => {
          setUser({
            id: attributes.sub,
            email: attributes.email,
            emailVerified: attributes['email_verified'],
          });

          setTokens({
            idToken: signInUserSession.idToken.jwtToken,
            accessToken: signInUserSession.accessToken.jwtToken,
            refreshToken: signInUserSession.refreshToken.token,
          });
        })
        .catch(() => {
          setUser(null);
          setTokens(null);
        });
    };

    Hub.listen('auth', updateUser);

    /**
     * Check manually the first time.
     */
    updateUser();

    return () => Hub.remove('auth', updateUser);
  }, []);

  const isAuthenticated = !!user;

  return (
    <I18nProvider
      initialLocale={initialLocale || 'pt-BR'}
      translations={{ ...defaultTranslations, ...translations }}
    >
      <AuthContext.Provider value={{ signOut, isAuthenticated, user, tokens }}>
        {children}
      </AuthContext.Provider>
    </I18nProvider>
  );
};

export const useAuth = () => React.useContext(AuthContext);

export default AuthProvider;

export { useIntl, useTranslation };
