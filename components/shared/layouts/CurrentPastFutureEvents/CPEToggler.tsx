import React from "react";
import { Button } from "../../elements";
import { capitalize } from "@/utils/helpers/formatting/capitalize";
import cn from "clsx";
import { motion } from "framer-motion";
import { COLORS } from "@/utils/constants/colors";

interface Props {
  choices: string[];
  chosenIdx: number;
  toggleIdx: (idx: number) => () => void;
}

const CPEToggler: React.FC<Props> = ({ choices, chosenIdx, toggleIdx }) => {
  return (
    <div>
      <div className="flex w-[26ch]">
        {choices.map((item, idx) => (
          <motion.button
            initial={{
              color: chosenIdx === idx ? COLORS.primary[800] : COLORS.sky[500],
            }}
            animate={{
              color: chosenIdx === idx ? COLORS.primary[800] : COLORS.sky[500],
            }}
            className={cn(
              chosenIdx === idx && "text-primary-800",
              chosenIdx !== idx && "text-gray-400",
              "font-semibold text-xl w-[13ch]"
            )}
            key={idx}
            onClick={toggleIdx(idx)}
          >
            {capitalize(item, true)}
          </motion.button>
        ))}
      </div>
      <div
        className={cn(
          "w-[26ch] flex h-1 z-20 relative",
          chosenIdx === 0 ? "justify-start" : "justify-end"
        )}
      >
        <motion.div
          key="bar"
          layout
          className="bg-primary-800 w-[13ch] h-1"
        ></motion.div>
      </div>
      <div className="w-full h-[2px] bg-gray-400 -translate-y-[2px] z-0 relative"></div>
    </div>
  );
};

export default CPEToggler;
