import React from "react";
import Header from "./Header";
import TimeboxList from "./TimeboxList";
import EditableTimebox from "./EditableTimebox";
import InspirationalQuote from "./InspirationalQuote";
import ReactPortal from "./Portal";

function AuthenticatedApp({ accessToken, onLogout }) {
  return (
    <>
      <ReactPortal
        wrapperId="header"
        children={<Header onLogout={onLogout} />}
      />

      <TimeboxList />
      <EditableTimebox />
      <InspirationalQuote />
    </>
  );
}

export default AuthenticatedApp;
