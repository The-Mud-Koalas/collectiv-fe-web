import CollectivLogoHorizontal from "@/components/shared/svg/logo/CollectivLogoHorizontal";
import React from "react";
import { useWindowSize } from "@/hooks/display";
import { BREAKPOINTS } from "@/utils/constants/breakpoints";
import ResponsiveNav from "./ResponsiveNav";
import { NavbarLinks } from "./NavLinks";
import Link from "next/link";
import NavbarAccount from "./NavAccount/NavbarAccount";
import { useAppContext } from "@/context/AppContext";
import cn from "clsx";
import { inter } from "@/utils/constants/fonts";

const LOGGED_IN: NavLinksType = [
  {
    name: "Forum",
    url: "/trending",
  },
  {
    name: "Location",
    url: "/location",
  },
  {
    name: "Events",
    url: "/event/discover",
  },
  {
    name: "Hosts",
    group: [
      {
        name: "About Host",
        url: "/event/host",
      },
      {
        name: "Host Event",
        url: "/event/create",
      },
      {
        name: "My Events",
        url: "/event",
      },
    ],
  },
  {
    name: "About Us",
    url: "/about",
  },
];

const NOT_LOGGED_IN: NavLinksType = [
  {
    name: "Forum",
    url: "/trending",
  },
  {
    name: "Location",
    url: "/location",
  },
  {
    name: "Events",
    url: "/event/discover",
  },
  {
    name: "About Us",
    url: "/about",
  },
];

const Navbar = () => {
  const { windowWidth } = useWindowSize();
  const { user } = useAppContext();
  const elements = user == null ? NOT_LOGGED_IN : LOGGED_IN;
  return (
    <nav className="fixed w-full sm:static h-[60px] flex pl-7 pr-7 md:pr-14 py-3 items-center bg-primary-300 justify-between z-20">
      <Link href="/">
        <CollectivLogoHorizontal size="md" colorCode="primary-800" />
      </Link>
      {windowWidth >= BREAKPOINTS.md ? (
        <>
          <NavbarLinks elements={elements} />
          {user == null ? (
            <Link href="/accounts/login" className={cn(inter.className, "text-base text-primary-800 font-medium")}>Login</Link>
          ) : (
            <NavbarAccount />
          )}
        </>
      ) : (
        <ResponsiveNav elements={elements} />
      )}
    </nav>
  );
};

export default Navbar;
