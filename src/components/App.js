import React, { useState } from "react";
import ErrorBoundary from "./ErrorBoundary";
import AuthenticationAPI from "../api/FetchAuthenticationApi";
import AuthenticationContext from "../contexts/AuthenticationContext";

// import LoginForm from "./LoginForm";
const LoginForm = React.lazy(() => import("./LoginForm"));
const AuthenticatedApp = React.lazy(() => import("./AuthenticatedApp"));

const App = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [previousLoginAttemptFailed, setPreviousLoginAttemptFailed] =
    useState(false);

  const isUserLoggedIn = () => {
    return !!accessToken;
  };

  const handleLoginAttempt = (credentials) => {
    AuthenticationAPI.login(credentials)
      .then(({ accessToken }) => {
        setAccessToken(accessToken);
        setPreviousLoginAttemptFailed(false);
      })
      .catch(() => {
        setPreviousLoginAttemptFailed(true);
      });
  };

  const handleLogout = () => {
    setAccessToken(null);
    setPreviousLoginAttemptFailed(false);
  };

  return (
    <div className="App">
      <ErrorBoundary message="Coś nie działa w całej aplikacji">
        {isUserLoggedIn() ? (
          <AuthenticationContext.Provider
            value={{
              accessToken: accessToken,
              onLogout: handleLogout,
              onLoginAttempt: handleLoginAttempt,
            }}
          >
            <React.Suspense fallback={"...loading"}>
              <AuthenticatedApp onLogout={handleLogout} />
            </React.Suspense>
          </AuthenticationContext.Provider>
        ) : (
          <AuthenticationContext.Provider
            value={{ onLoginAttempt: handleLoginAttempt }}
          >
            <React.Suspense fallback={"Loading login form..."}>
              <LoginForm
                errorMessage={
                  previousLoginAttemptFailed ? "Nie udało się zalogować" : null
                }
              />
            </React.Suspense>
          </AuthenticationContext.Provider>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default App;
