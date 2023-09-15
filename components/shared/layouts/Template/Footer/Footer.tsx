import CollectivLogo from "@/components/shared/svg/logo/CollectivLogo";
import { COLORS } from "@/utils/constants/colors";
import { inter, interItalics } from "@/utils/constants/fonts";
import { Inter_Tight } from "next/font/google";
import Link from "next/link";
import React from "react";

const FOOTER_LINKS: NavLinkType[] = [
  {
    name: "Forum",
    url: "/forum",
  },
  {
    name: "Community Projects",
    url: "/projects",
  },
  {
    name: "About Hosting Event",
    url: "/event/host",
  },
  {
    name: "About Collectiv",
    url: "/about",
  },
  {
    name: "Service Initiatives",
    url: "/event",
  },
  {
    name: "Create an Event",
    url: "/event/create",
  },
];

const POLICY_LINKS: NavLinkType[] = [
  {
    name: "Cookies Policy",
    url: "/policy/cookies",
  },
  {
    name: "Legal Terms",
    url: "/policy/legal",
  },
  {
    name: "Privacy Policy",
    url: "policy/privacy",
  },
];

const Footer = () => {
  return (
    <footer className="bg-primary-800 w-full py-8 px-4">
      <div className="flex flex-col md:flex-row gap-8 md:items-center">
        <CollectivLogo color={COLORS.primary[300]} dimensions={{ width: 50 }} />
        <p
          className={`${interItalics.className} text-base leading-5 tracking-wider w-[20ch] sm:w-[34ch] text-primary-300 font-medium`}
        >
          Elevate your community experience: <br/>Create, manage, participate!
        </p>
      </div>
      <div className="flex flex-col w-fit md:grid md:gap-x-16 gap-y-4 grid-cols-3 grid-rows-2 my-8">
        {FOOTER_LINKS.map((link) => (
          <Link
            className={`${inter.className} text-secondary-200 font-medium w-fit`}
            key={link.url}
            href={link.url}
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div className="border-t-2 border-primary-300 border-dashed w-full h-0"></div>
      <div className="flex mt-6 gap-4">
        {POLICY_LINKS.map((policyLink) => (
          <Link className={`${inter.className} text-primary-200 font-medium text-sm`} key={policyLink.url} href={policyLink.url}>
            {policyLink.name}
          </Link>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
