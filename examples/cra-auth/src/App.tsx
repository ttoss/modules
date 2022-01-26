import { Auth, useAuth, AuthContainer } from '@ttoss/auth';
import { useTheme } from '@ttoss/ui';

const AuthData = () => {
  const { isAuthenticated, user, tokens } = useAuth();

  return (
    <pre>{JSON.stringify({ isAuthenticated, tokens, user }, null, 2)}</pre>
  );
};

const App = () => {
  const { isAuthenticated } = useAuth();

  const a = useTheme();

  if (!isAuthenticated) {
    return (
      <AuthContainer>
        <Auth />
        {/* <Themed.pre>{JSON.stringify(a, null, 2)}</Themed.pre> */}
      </AuthContainer>
    );
  }

  return <AuthData />;
};

export default App;
