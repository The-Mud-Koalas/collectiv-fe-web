import CollectivLogoHorizontal from "@/components/shared/svg/logo/CollectivLogoHorizontal";
import React from "react";
import { useWindowSize } from "@/hooks/display";
import { BREAKPOINTS } from "@/utils/constants/breakpoints";
import ResponsiveNav from "./ResponsiveNav";
import { NavbarLinks } from "./NavLinks";
import Link from "next/link";
import NavbarAccount from "./NavAccount/NavbarAccount";

const ELEMENTS: NavLinksType = [
  {
    name: "Forum",
    url: "/forum"
  },
  {
    name: "Events",
    url: "/event/discover"
  },
  {
    name: "Hosts",
    group: [
      {
        name: "About Host",
        url: "/event/host"
      },
      {
        name: "Host Event",
        url: "/event/create"
      },
      {
        name: "My Events",
        url: "/event"
      }
    ],
  },
  {
    name: "About Us",
    url: "/about",
  },
];

const Navbar = () => {
  const { windowWidth } = useWindowSize();
  return (
    <nav className="fixed w-full md:static h-[60px] flex pl-7 pr-7 md:pr-14 py-3 items-center bg-primary-300 justify-between">
      <Link href="/">
        <CollectivLogoHorizontal size="md" colorCode="primary-800" />
      </Link>
      {windowWidth >= BREAKPOINTS.sm ? (<>
        <NavbarLinks elements={ELEMENTS} />
        <NavbarAccount/>
      </>
      ) : (
        <ResponsiveNav elements={ELEMENTS}/>
      )}
    </nav>
  );
};

export default Navbar;
