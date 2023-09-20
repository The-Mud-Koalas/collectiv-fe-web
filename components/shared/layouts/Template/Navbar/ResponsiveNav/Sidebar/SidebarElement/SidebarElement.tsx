import React from "react";
import SidebarLink from "../SidebarLink";
import SidebarGroup from "../SidebarGroup";

interface Props {
  element: NavGroupType | NavLinkType;
}

const SidebarElement: React.FC<Props> = ({ element }) => {
  if ("url" in element) return <SidebarLink {...element} />;
  return <SidebarGroup {...element} />;
};

export default SidebarElement;
