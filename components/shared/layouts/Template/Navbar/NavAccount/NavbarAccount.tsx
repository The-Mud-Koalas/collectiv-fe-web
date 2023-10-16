import { Chevron } from "@/components/shared/svg/icons";
import { COLORS } from "@/utils/constants/colors";
import { inter } from "@/utils/constants/fonts";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import NavbarLink from "../NavLinks/NavLink";
import Logout from "./Logout";

const NavbarAccount = () => {
  const [isShown, setShown] = useState(false);
  return (
    <div className="relative" onMouseLeave={() => setShown(false)}>
      <button
        onClick={() => setShown((prev) => !prev)}
        onMouseEnter={() => setShown(true)}
        onFocus={() => setShown(true)}
        onBlur={() => setShown(false)}
        className={`${inter.className} rounded-3xl flex gap-2 items-center px-2 py-0.5 border-[1px] border-primary-800 font-medium text-primary-800 text-base`}
      >
        <p>My Account</p>
        <Chevron color={COLORS.primary[800]} dimensions={{ width: 15 }} />
      </button>
      <AnimatePresence>
        {isShown && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-30"
            key="nav-acc"
          >
            <ul className="flex flex-col gap-5 mt-6 bg-primary-300 px-4 pt-2 pb-4  w-44">
              <li>
                <NavbarLink name="Your Activities" url="/wrapped"/>
              </li>
              <li>
                <NavbarLink name="Participated Events" url="/event/registered"/>
              </li>
              <div className="bg-primary-800 w-full h-[1px]"></div>
              <li>
                <NavbarLink name="Profile" url="/profile"/>
              </li> 
              <li>
                <Logout/>
              </li> 
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavbarAccount;
