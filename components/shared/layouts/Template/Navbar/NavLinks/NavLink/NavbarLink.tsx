import { Arrow } from "@/components/shared/svg/icons";
import { COLORS } from "@/utils/constants/colors";
import { inter } from "@/utils/constants/fonts";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface Props extends NavLinkType {
  showArrow?: boolean;
}

const NavbarLink: React.FC<Props> = ({ name, url, showArrow }) => {
  const [isHover, setIsHover] = useState(false);
  const router = useRouter();
  return (
    <Link
      className={`${inter.className} text-base text-primary-800 font-medium`}
      href={url}
      onFocus={() => setIsHover(true)}
      onMouseEnter={() => setIsHover(true)}
      onBlur={() => setIsHover(false)}
      onMouseLeave={() => setIsHover(false)}
    >
      <p className="flex items-center justify-between">
        {name}{" "}
        {showArrow && isHover && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -5 }}
              key={url}
            >
              <Arrow color={COLORS.primary[800]} dimensions={{ width: 20 }} />
            </motion.div>
          </AnimatePresence>
        )}{" "}
      </p>
      <motion.div
        initial={{ width: (router.asPath === url) ? "100%" : 0 }}
        animate={{ width: (isHover || router.asPath === url) ? "100%" : 0 }}
        className="bg-primary-800 h-[2px]"
      ></motion.div>
    </Link>
  );
};

export default NavbarLink;
