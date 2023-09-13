import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    const url = router.asPath;

    if (!user) {
      router.push(`/accounts/login?next=${encodeURIComponent(url)}`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) return <></>;
  return children;
};

export default ProtectedRoute;
