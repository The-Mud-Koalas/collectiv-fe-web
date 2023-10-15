import React from "react";
import { Chevron } from "../../svg/icons";
import { COLORS } from "@/utils/constants/colors";
import { Button } from "..";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  noOfPages: number | null;
  currentPage: number;
  prev?: number | null;
  next?: number | null;
  changePage: (page: number) => () => void;
}

const CircleToggler = ({
  isSelected,
  onSelect,
}: {
  isSelected: boolean;
  onSelect: () => void;
}) => {
  return (
    <Button onClick={onSelect}>
      <motion.svg
        width="15"
        height="15"
        viewBox="0 0 17 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.circle
          cx="8.5"
          cy="9"
          r="8.5"
          initial={{
            fill: isSelected ? COLORS.primary[300] : COLORS.gray[400],
          }}
          animate={{
            fill: isSelected ? COLORS.primary[300] : COLORS.gray[400],
          }}
          fill={isSelected ? COLORS.primary[300] : COLORS.gray[400]}
        />
      </motion.svg>
    </Button>
  );
};

const PageToggler: React.FC<Props> = ({
  noOfPages,
  currentPage,
  prev,
  next,
  changePage,
}) => {
  const noOfCircles = Math.min(noOfPages!, 3);
  const displayedArray = [...Array(noOfCircles).keys()].map((no) => no + 1);

  const getIfItemIsSelected = (item: number) => {
    if (item === 1) return currentPage === item;

    if (item === noOfCircles) return currentPage === noOfPages;

    return 2 <= currentPage && currentPage < noOfPages!;
  };

  const onSelect = (item: number) => {
    if (item === noOfCircles) return changePage(noOfPages!);
    return changePage(item);
  };
  return (
    <div className="flex items-center gap-4 justify-center my-4">
      <div className="w-6">
        <AnimatePresence>
          {prev && (
            <motion.div
              className="grid items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Button onClick={changePage(prev)} className="rotate-90">
                <Chevron
                  color={COLORS.primary[800]}
                  dimensions={{ width: 30 }}
                />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex gap-3">
        {displayedArray.map((item) => (
          <CircleToggler
            key={item}
            isSelected={getIfItemIsSelected(item)}
            onSelect={onSelect(item)}
          />
        ))}
      </div>
      <div className="w-6">
        <AnimatePresence>
          {next && (
            <motion.div
              className="grid items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Button onClick={changePage(next)} className="-rotate-90">
                <Chevron
                  color={COLORS.primary[800]}
                  dimensions={{ width: 30 }}
                />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PageToggler;
