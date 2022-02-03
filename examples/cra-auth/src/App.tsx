import { Auth, useAuth, AuthContainer } from '@ttoss/auth';

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
        <Auth />
      </AuthContainer>
    );
  }

  return <AuthData />;
};

export default App;
