import jwt from "jsonwebtoken";
import AuthenticationContext from "../contexts/AuthenticationContext";
import { useContext } from "react";

const UserGreeting = () => {
  const { accessToken } = useContext(AuthenticationContext);
  return `Witaj ${getUserEmail(accessToken)}`;
};

function getUserEmail(accessToken) {
  const decodedToken = jwt.decode(accessToken);
  return decodedToken.email;
}

export default UserGreeting;
