import React, { useState } from "react";
import Burger from "./Burger";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./Sidebar";

interface Props {
  elements: NavLinksType;
}

const ResponsiveNav: React.FC<Props> = ({ elements }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Burger isOpen={isOpen} toggleOpen={() => setIsOpen((prev) => !prev)} />
      <AnimatePresence mode="popLayout">
        {isOpen && (
          <motion.div initial={{ x: 640 }}
          animate={{ x: 0 }}
          exit={{ x: 640 }}
          transition={{ type: "tween"}} className="fixed top-[60px] left-0" key="sidebar">
            <Sidebar links={elements} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ResponsiveNav;
