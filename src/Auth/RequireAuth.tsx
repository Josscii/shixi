import { FunctionComponent } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const RequireAuth: FunctionComponent = ({ children }) => {
  let auth = useAuth();
  let location = useLocation();

  if (auth.authInfo.authType === "none") {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // must wrap with a fragment?
  //stackoverflow.com/questions/63898651/getting-error-when-using-type-react-reactnode-to-children-which-type-should-i
  https: return <>{children}</>;
};

export default RequireAuth;
