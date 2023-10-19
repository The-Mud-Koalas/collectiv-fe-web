import React from "react";
import SidebarElement from "./SidebarElement";
import SidebarGroup from "./SidebarGroup";
import { useAppContext } from "@/context/AppContext";

interface Props {
  links: NavLinksType;
}

const authUrls: NavLinkType[] = [
  {
    name: "Your Activities",
    url: "/your-month-wrapped",
  },
  {
    name: "Registered Events",
    url: "/event/registered",
  },
  {
    name: "Hosted Events",
    url: "/event/hosted",
  },
  {
    name: "Profile",
    url: "/profile",
  },
];

const noUserUrls: NavLinkType[] = [
  {
    name: "Login",
    url: "/accounts/login",
  },
];

const Sidebar: React.FC<Props> = ({ links }) => {
  const { logout, user } = useAppContext();
  const urls = user == null ? noUserUrls : authUrls;
  return (
    <ul className="bg-primary-800 h-screen w-screen p-8 flex flex-col gap-3">
      {links.map((link) => (
        <SidebarElement element={link} key={`sidebar-${link.name}`} />
      ))}
      <div className="w-full h-[2px] bg-primary-300"></div>
      <li>
        <SidebarGroup
          name="My Account"
          logout={user == null ? undefined : logout}
          group={urls}
        />
      </li>
    </ul>
  );
};

export default Sidebar;
