import { motion } from "framer-motion";
import React from "react";

interface Props {
  isOpen: boolean;
  toggleOpen: () => void;
}

const Burger: React.FC<Props> = ({ isOpen, toggleOpen }) => {
  return (
    <button onClick={toggleOpen} className="flex flex-col gap-1">
      <motion.div
        animate={{
          rotate: isOpen ? "-45deg" : 0,
          width: isOpen ? "20px" : "23px",
        }}
        className="bg-primary-800 h-[3px] w-[23px] origin-right"
      ></motion.div>
      <motion.div
        animate={{
          translateX: isOpen ? -5 : 0,
          opacity: isOpen ? 0 : 1,
        }}
        className="bg-primary-800 h-[3px] w-[23px]"
      ></motion.div>
      <motion.div
        animate={{
          rotate: isOpen ? "45deg" : 0,
          width: isOpen ? "20px" : "23px",
        }}
        className="bg-primary-800 h-[3px] w-[23px] origin-right"
      ></motion.div>
    </button>
  );
};

export default Burger;
