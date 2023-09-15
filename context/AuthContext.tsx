import { Loading } from "@/components/shared/layouts/Loading";
import { auth } from "@/lib/firebase";
import {
  User,
  UserCredential,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextProps {
  user: User | null;
  logout: () => void
}

const AuthContext = createContext<AuthContextProps>({ user: null, logout: () => {} });
const useAuthContext = () => useContext(AuthContext);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const logout = async () => await signOut(auth);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <AuthContext.Provider value={{ user, logout }}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider, useAuthContext };
