import { LocationModal } from "@/components/features/home/LocationModal";
import { Button, Card, Modal } from "@/components/shared/elements";
import { Loading } from "@/components/shared/layouts/Loading";
import Cross from "@/components/shared/svg/icons/Cross";
import { auth } from "@/lib/firebase";
import { COLORS } from "@/utils/constants/colors";
import { garamond, inter } from "@/utils/constants/fonts";
import { getUserInfo } from "@/utils/fetchers/authentication";
import { useLoadScript } from "@react-google-maps/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
  useRef,
  useState,
} from "react";

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (msg: string) => void;
    };
  }
}

interface AuthContextProps {
  user: User | null;
  logout: () => void;
  sendMessageToRN: (msg: Record<string, any>) => void;
  isInRN: () => boolean;
  userData?: UserData | null;
  refetch?: () => void;
}

const AppContext = createContext<AuthContextProps>({
  user: null,
  logout: () => {},
  sendMessageToRN: () => {},
  isInRN: () => false,
  userData: null,
  refetch: () => false,
});
const useAppContext = () => useContext(AppContext);

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const logout = async () => {
    await signOut(auth);
    sendMessageToRN({ type: "auth-token", token: null });
    router.push("/accounts/login");
  };
  const queryClient = useQueryClient();

  const isInRN = () => window.ReactNativeWebView != null;
  console.log({ test: user != null})

  const {
    data: userData,
    fetchStatus,
    status,
    refetch,
  } = useQuery<UserData>({
    queryFn: getUserInfo,
    queryKey: ["user-info"],
    // enabled: user != null,
    enabled: false
  });

  const sendMessageToRN = (msg: Record<string, any>) => {
    if (window.ReactNativeWebView == null) return;

    window.ReactNativeWebView.postMessage(JSON.stringify(msg));
  };

  const hasUserDataLoaded = useRef(false);

  const onAccept = () => {
    sendMessageToRN({ type: "location-sharing", agree: true });
    setShowModal(false);
  };

  useEffect(() => {
    if (userData == null) return;
    const { location_track } = userData;
    sendMessageToRN({ type: "location-sharing", agree: location_track });
  }, [userData]);

  const [isAuthLoading, setAuthLoading] = useState(true);
  const { isLoaded: isMapsScriptLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
    libraries: ["places"],
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      queryClient.invalidateQueries({ queryKey: ["user-info"] });

      if (user == null) {
        setAuthLoading(false);
        return;
      }

      setAuthLoading(false);

      // if (window.ReactNativeWebView == null) return;
      // setShowModal(true);
    });
    return () => unsubscribe();
  }, [queryClient]);

  if (!isMapsScriptLoaded || isAuthLoading) return <Loading />;

  return (
    <AppContext.Provider
      value={{ user, logout, sendMessageToRN, isInRN, userData, refetch }}
    >
      {children}
      <LocationModal
        onAccept={onAccept}
        setShowModal={setShowModal}
        showModal={showModal}
      />
    </AppContext.Provider>
  );
};

export { AppProvider, useAppContext };
