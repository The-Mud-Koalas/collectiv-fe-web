import CollectivLogo from "@/components/shared/svg/logo/CollectivLogo";
import CollectivLogoHorizontal from "@/components/shared/svg/logo/CollectivLogoHorizontal";
import { useWindowSize } from "@/hooks/display";
import { COLORS } from "@/utils/constants/colors";
import React from "react";

const AccountNavbar = () => {
  const { windowWidth } = useWindowSize();
  return (
    <nav className="flex px-7 py-2 bg-primary-300">
      <CollectivLogoHorizontal size="sm" colorCode="primary-800"/>
    </nav>
  );
};

export default AccountNavbar;
