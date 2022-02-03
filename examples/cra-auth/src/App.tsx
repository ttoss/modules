import { Auth, useAuth, AuthContainer } from '@ttoss/auth';
import { Box } from '@ttoss/ui';

const Logo = () => {
  return (
    <Box sx={{ width: 100, height: 100, backgroundColor: 'primary' }}>Logo</Box>
  );
};

const AuthData = () => {
  const { isAuthenticated, user, tokens } = useAuth();

  return (
    <pre>{JSON.stringify({ isAuthenticated, tokens, user }, null, 2)}</pre>
  );
};

const App = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <AuthContainer>
        <Auth logo={<Logo />} />
      </AuthContainer>
    );
  }

  return <AuthData />;
};

export default App;
