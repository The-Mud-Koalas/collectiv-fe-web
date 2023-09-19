import { useAppContext } from "@/context/AppContext";
import { inter } from "@/utils/constants/fonts";
import { motion } from "framer-motion";
import React, { useState } from "react";

const Logout = () => {
  const [isHover, setHover] = useState(false);
  const { logout } = useAppContext();
  return (
    <button
      className={`w-full flex flex-col ${inter.className} text-base text-primary-800 font-medium`}
      onFocus={() => setHover(true)}
      onMouseEnter={() => setHover(true)}
      onBlur={() => setHover(false)}
      onMouseLeave={() => setHover(false)}
      onClick={logout}
    >
      <p>Logout</p>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: isHover ? "100%" : 0 }}
        className="bg-primary-800 h-[2px]"
      ></motion.div>
    </button>
  );
};

export default Logout;
