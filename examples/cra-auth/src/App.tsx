import { Auth, useAuth, AuthContainer, useI18n } from '@ttoss/auth';
import { Box } from '@ttoss/ui';

const Language = () => {
  const { setLocale, locale } = useI18n();

  return (
    <div>
      <p>Selected locale: {locale}</p>
      <button onClick={() => setLocale('pt-BR')}>pt-BR</button>
      <button onClick={() => setLocale('en-US')}>en-US</button>
    </div>
  );
};

const Logo = () => {
  return (
    <Box sx={{ width: 100, height: 100, backgroundColor: 'primary' }}>Logo</Box>
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
        <Auth logo={<Logo />} />
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
