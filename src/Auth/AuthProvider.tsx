import { createContext, FunctionComponent, useContext } from "react";
import { useLocalStorage } from "../Common/useLocalStorage";

export interface AuthInfo {
  authType: "local" | "notion" | "none";
  payload?: any;
}

export interface AuthContextType {
  authInfo: AuthInfo;
  localAuth: (callback: VoidFunction) => void;
  notionAuth: (callback: VoidFunction) => void;
  logout: (callback: VoidFunction) => void;
}

const AuthContext = createContext<AuthContextType>(null!);

const AUTH_INFO_KEY = "auth_info";

const AuthProvider: FunctionComponent = ({ children }) => {
  const [authInfo, setAuthInfo] = useLocalStorage<AuthInfo>(AUTH_INFO_KEY, {
    authType: "none",
  });

  const localAuth = (callback: VoidFunction) => {
    setAuthInfo({ authType: "local" });
    callback();
  };

  const notionAuth = (callback: VoidFunction) => {
    callback();
  };

  const logout = (callback: VoidFunction) => {
    setAuthInfo({ authType: "none" });
    callback();
  };

  let value = { authInfo, localAuth, notionAuth, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
