import CollectivLogoHorizontal from "@/components/shared/svg/logo/CollectivLogoHorizontal";
import React from "react";

const AccountNavbar = () => {
  return (
    <nav className="flex px-7 py-2 bg-primary-300">
      <CollectivLogoHorizontal size="sm" colorCode="primary-800"/>
    </nav>
  );
};

export default AccountNavbar;
