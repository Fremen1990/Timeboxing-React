import React, { useRef } from "react";
import AuthenticationContext from "../contexts/AuthenticationContext";

const LoginForm = ({ errorMessage }) => {
  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  return (
    <AuthenticationContext.Consumer>
      {({ onLoginAttempt }) => {
        const handleSubmit = (event) => {
          event.preventDefault();
          onLoginAttempt({
            email: emailInput.current.value,
            password: passwordInput.current.value,
          });
          emailInput.current.value = "";
          passwordInput.current.value = "";
        };

        return (
          <form onSubmit={handleSubmit} className="LoginForm">
            {errorMessage ? (
              <div className="LoginForm__error-message">{errorMessage}</div>
            ) : null}
            <label>
              Email
              <input
                ref={emailInput}
                type="text"
                defaultValue="bob@example.com"
              />
            </label>
            <br />
            <label>
              Hasło
              <input
                ref={passwordInput}
                type="password"
                defaultValue="secret"
              />
            </label>
            <br />
            <button>Zaloguj się</button>
          </form>
        );
      }}
    </AuthenticationContext.Consumer>
  );
};

export default LoginForm;
