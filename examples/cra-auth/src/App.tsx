import { Auth, useAuth, AuthContainer, useTranslation } from '@ttoss/auth';

const Language = () => {
  const { changeLanguage, locale } = useTranslation();

  return (
    <div>
      <p>Selected locale: {locale}</p>
      <button onClick={() => changeLanguage('pt-BR')}>pt-BR</button>
      <button onClick={() => changeLanguage('en-US')}>en-US</button>
    </div>
  );
};

const AuthData = () => {
  const { isAuthenticated, user, tokens, signOut } = useAuth();

  return (
    <div>
      <pre>{JSON.stringify({ isAuthenticated, tokens, user }, null, 2)}</pre>
      <button onClick={signOut}>Logout</button>
    </div>
  );
};

const App = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <AuthContainer>
        <Auth />
        <Language />
      </AuthContainer>
    );
  }

  return (
    <>
      <AuthData />
      <Language />
    </>
  );
};

export default App;
