import { Chevron } from "@/components/shared/svg/icons";
import { COLORS } from "@/utils/constants/colors";
import { inter } from "@/utils/constants/fonts";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";

interface Props extends NavGroupType {
  logout?: () => void;
}

const SidebarGroup: React.FC<Props> = ({ name, group, logout }) => {
  const [isOpen, setOpen] = useState(false);
  const navGroup = group as NavLinkType[];

  return (
    <motion.div
      initial={{ backgroundColor: "none" }}
      animate={{
        backgroundColor: isOpen ? COLORS.primary[700] : COLORS.primary[800],
      }}
      transition={{ type: "tween" }}
      className="p-2"
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`${inter.className} flex text-2xl text-primary-300 font-medium w-full justify-between items-center`}
      >
        <p>{name}</p>
        <motion.div
          initial={{ rotate: "0deg" }}
          animate={{ rotate: isOpen ? "180deg" : "0deg" }}
        >
          <Chevron color={COLORS.primary[300]} dimensions={{ height: 28 }} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.ul
            key={`slg-${name}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`${inter.className} flex flex-col w-full gap-2`}
          >
            {navGroup.map((item, idx) => (
              <li key={item.url} className={`${idx === 0 && "mt-3"}`}>
                <Link className="text-primary-300" href={item.url}>
                  {item.name}
                </Link>
              </li>
            ))}
            {logout != null && (
              <li>
                <button className="text-primary-300" onClick={logout}>
                  Logout
                </button>
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SidebarGroup;
