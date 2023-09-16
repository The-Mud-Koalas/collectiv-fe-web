import { Locked, Unlocked } from "@/components/shared/svg/icons";
import { useEventCreationContext } from "@/context/event/EventCreationContext";
import { COLORS } from "@/utils/constants/colors";
import { inter } from "@/utils/constants/fonts";
import { motion } from "framer-motion";
import React from "react";

interface Props {
  idx: number;
  name: string;
}

const StageButton: React.FC<Props> = ({ idx, name }) => {
  const { stage, changeStage, visitedStage } = useEventCreationContext();
  const textColor = idx === stage ? COLORS.primary[300] : COLORS.primary[800];
  const bgColor = idx === stage ? COLORS.primary[800] : COLORS.primary[300];
  return (
    <motion.button
      onClick={changeStage(idx)}
      initial={{ backgroundColor: COLORS.primary[300] }}
      animate={{ backgroundColor: bgColor }}
      transition={{ type: "tween", duration: 0.2 }}
      className="flex gap-2 items-center bg-primary-300 text-primary-800 font-medium py-1 text-base rounded-3xl px-3"
    >
      {visitedStage.includes(idx) ? (
        <Unlocked color={textColor} dimensions={{ height: 17 }} />
      ) : (
        <Locked color={textColor} dimensions={{ height: 17 }} />
      )}
      <motion.p
        initial={{ color: COLORS.primary[800] }}
        animate={{ color: textColor }}
        transition={{ type: "tween", duration: 0.2 }}
        className={`${inter.className}`}
      >
        {name}
      </motion.p>
    </motion.button>
  );
};

export default StageButton;
