import { inter } from "@/utils/constants/fonts";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import NavbarLink from "../NavLink";

const NavbarGroup: React.FC<NavGroupType> = ({ name, group }) => {
  const [isShown, setShown] = useState(false);
  const navGroup = group as NavLinkType[];

  return (
    <div className="relative flex items-center" onMouseLeave={() => setShown(false)}>
      <button
        onClick={() => setShown((prev) => !prev)}
        onMouseEnter={() => setShown(true)}
        onFocus={() => setShown(true)}
        onBlur={() => setShown(false)}
        className={`${inter.className} text-base text-primary-800 font-medium`}
      >
        {name}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: isShown ? "100%" : 0 }}
          className="bg-primary-800 h-[2px]"
        ></motion.div>
      </button>

      <AnimatePresence>
        {isShown && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-[100%]"
            key={`group-${name}`}
          >
            <ul className="flex flex-col gap-4 mt-6 bg-primary-300 w-52 px-4 pt-2 pb-4">
              {navGroup.map((link) => (
                <NavbarLink {...link} key={link.url} showArrow/>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavbarGroup;
