import { Button } from "@/components/shared/elements";
import { inter } from "@/utils/constants/fonts";
import { motion } from "framer-motion";
import React from "react";

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isSelected: boolean;
  label: string;
}

const VolunteerToggle: React.FC<Props> = ({ onClick, isSelected, label }) => {
  return (
    <Button onClick={onClick} className="flex items-center gap-2">
      <motion.svg
        width="19"
        height="18"
        viewBox="0 0 19 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.rect
          x="1"
          y="0.5"
          width="17"
          height="17"
          rx="4.5"
          fill="#D9D9D9"
          initial={{fillOpacity: isSelected ? 1 : 0}}
          animate={{fillOpacity: isSelected ? 1 : 0}}
          stroke="#CDCFD0"
        />
      </motion.svg>
      <p className={`${inter.className} font-medium`}>{ label }</p>
    </Button>
  );
};

export default VolunteerToggle;
