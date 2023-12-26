import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProtect";

function ProtectedHomeRoute({ children }) {
  const { isSignedIn } = useContext(AuthContext);

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  return children;
}

export default ProtectedHomeRoute;
