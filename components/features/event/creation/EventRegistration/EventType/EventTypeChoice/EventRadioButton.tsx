import React from "react";
import { motion } from "framer-motion";
import { COLORS } from "@/utils/constants/colors";

const circleVariants = {
  selected: {
    fill: "#9076C0",
    stroke: "#9076C0",
    strokeWidth: 2,
  },
  unselected: {
    fill: "#FFFFFF",
    stroke: "rgba(0, 0, 0, 0.5)",
    strokeWidth: 1,
  },
};

const tickVariants = {
  selected: {
    pathLength: 1,
    transition: {
      duration: 0.35,
    },
  },
  unselected: {
    pathLength: 0,
    transition: {
      duuration: 0.35,
    },
  },
};

interface Props {
  isSelected: boolean;
}

const EventRadioButton: React.FC<Props> = ({ isSelected }) => {
  return (
    <motion.svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.circle
        cx="10.5"
        cy="10.5"
        r="9.39474"
        fill={COLORS.tertiary[100]}
        stroke="#CDCFD0"
        stroke-width="2.21053"
      />
      <motion.circle
        cx="10.5221"
        cy="10.5222"
        r="9"
        fill={COLORS.primary[300]}
        initial={{ r: 0 }}
        animate={{ r: isSelected ? 9 : 0 }}
      />
    </motion.svg>
  );
};

export default EventRadioButton;
