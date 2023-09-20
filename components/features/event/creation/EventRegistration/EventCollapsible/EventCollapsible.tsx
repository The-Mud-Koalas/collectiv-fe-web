import { Button } from "@/components/shared/elements";
import { Chevron } from "@/components/shared/svg/icons";
import { garamond, inter } from "@/utils/constants/fonts";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

interface Props extends React.PropsWithChildren {
  sectionId: string;
  sectionTitle: string;
  description: string[];
  isCollapsibleEnabled: boolean;
  childrenIfCollapsed?: React.ReactNode;
  isOpened: boolean;
  openCollapsible: () => void;
  closeCollapsible: () => void;
}

const EventCollapsible: React.FC<Props> = ({
  sectionId,
  isOpened,
  openCollapsible,
  closeCollapsible,
  sectionTitle,
  children,
  childrenIfCollapsed,
  description,
  isCollapsibleEnabled,
}) => {
  return (
    <motion.section
      id={sectionId}
      className="flex flex-col gap-4 w-full relative py-4 px-16"
    >
      <Button
        disabled={!isCollapsibleEnabled}
        className="absolute right-4 top-4"
        type="button"
        onClick={isOpened ? closeCollapsible : openCollapsible}
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: isOpened ? "180deg" : 0 }}
        >
          <Chevron dimensions={{ width: 48 }} color="black" />
        </motion.div>
      </Button>
      <h2 className={`${garamond.className} text-5xl`}>{sectionTitle}</h2>
      <div className="flex flex-col md:flex-row gap-[15%] w-full">
        <p className={`${inter.className} text-lg font-medium w-full`}>
          {description.map((desc, idx) =>
            idx % 2 === 0 ? (
              desc
            ) : (
              <span className="bg-secondary-200" key={`desc-${idx}`}>
                {desc}
              </span>
            )
          )}
        </p>
        <div className="w-full">
          <AnimatePresence>
            {isOpened ? (
              <motion.div
                key="main"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                {children}
              </motion.div>
            ) : (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                {childrenIfCollapsed}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
};

export default EventCollapsible;
