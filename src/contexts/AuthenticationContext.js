import React from "react";

const AuthenticationContext = React.createContext({
  accessToken: null,
  onLogout: () => {},
  onLoginAttempt: () => {},
});

export default AuthenticationContext;
