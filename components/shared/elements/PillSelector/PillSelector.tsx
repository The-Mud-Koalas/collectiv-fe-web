import React from "react";
import { Button } from "..";
import { motion } from "framer-motion";
import { COLORS } from "@/utils/constants/colors";

interface Props {
  choices: string[];
  changeIdx: (idx: number) => () => void;
  currentIdx: number;
}

const PillSelector: React.FC<Props> = ({ choices, changeIdx, currentIdx }) => {
  return (
    <div className="bg-secondary-200 rounded-lg px-2 py-2 w-full flex gap-3">
      {choices.map((choice, idx) => (
        <motion.button
          initial={
            currentIdx === idx
              ? { color: "white", backgroundColor: COLORS.secondary[500] }
              : {
                  color: COLORS.secondary[500],
                  backgroundColor: COLORS.secondary[200],
                }
          }
          animate={
            currentIdx === idx
              ? { color: "white", backgroundColor: COLORS.secondary[500] }
              : {
                  color: COLORS.secondary[500],
                  backgroundColor: COLORS.secondary[200],
                }
          }
          key={`${choice}-${idx}`}
          className="bg-secondary-500 text-xs sm:text-sm lg:text-base text-white w-full rounded-lg py-2"
          onClick={changeIdx(idx)}
        >
          {choice}
        </motion.button>
      ))}
    </div>
  );
};

export default PillSelector;
