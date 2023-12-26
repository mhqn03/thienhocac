import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const secret_key = import.meta.env.VITE_SECRET_KEY;
  const [isSignedIn, setIsSignedIn] = useState(
    Boolean(localStorage.getItem(`${secret_key}`))
  );

  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
