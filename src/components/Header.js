import UserGreeting from "./UserGreeting";
import React from "react";
import AuthenticationContext from "../contexts/AuthenticationContext";

function Header() {
  return (
    <AuthenticationContext.Consumer>
      {({ onLogout }) => (
        <header className="header">
          <UserGreeting />
          <a onClick={onLogout} className="header__logout-link" href="#">
            Wyloguj się
          </a>
        </header>
      )}
    </AuthenticationContext.Consumer>
  );
}

export default Header;
