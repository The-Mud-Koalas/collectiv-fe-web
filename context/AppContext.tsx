import { Loading } from "@/components/shared/layouts/Loading";
import { auth } from "@/lib/firebase";
import { useLoadScript } from "@react-google-maps/api";
import {
  User,
  UserCredential,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/router";
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

const AppContext = createContext<AuthContextProps>({ user: null, logout: () => {} });
const useAppContext = () => useContext(AppContext);

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const logout = async () => {
    await signOut(auth);
    router.push("/accounts/login")
  };

  const [isAuthLoading, setAuthLoading] = useState(true);
  const { isLoaded: isMapsScriptLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
    libraries: ["places"]
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (!isMapsScriptLoaded && isAuthLoading) return <Loading />;

  return (
    <AppContext.Provider value={{ user, logout }}>{children}</AppContext.Provider>
  );
};

export { AppProvider, useAppContext };
