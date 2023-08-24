import CollectivLogo from "@/components/shared/svg/CollectivLogo";
import { useWindowSize } from "@/hooks/display";
import { COLORS } from "@/utils/constants/colors";
import React from "react";

const AccountNavbar = () => {
  const { windowWidth } = useWindowSize();
  return (
    <nav className="flex px-7 py-3.5 bg-primary-300">
      <CollectivLogo color={COLORS.primary[700]} dimensions={{ width: windowWidth >= 768 ? 150 : 75 }} />
    </nav>
  );
};

export default AccountNavbar;
