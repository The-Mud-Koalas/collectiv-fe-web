import { useEventCreationContext } from "@/context/event/EventCreationContext";
import React, { useState } from "react";
import StageToggler from "./StageToggler";
import Guidelines from "../Guidelines";
import EventRegistration from "../EventRegistration";
import EventCreated from "../EventCreated";
import { AnimatePresence, motion } from "framer-motion";

const EVENT_CREATION_STAGES: EventCreationStages[] = [
  {
    name: "Guidelines",
    StageComponent: Guidelines,
  },
  {
    name: "Event Registration",
    StageComponent: EventRegistration,
  },
  {
    name: "Event Created",
    StageComponent: EventCreated,
  },
];

const EventCreation = () => {
  const { stage } = useEventCreationContext();
  const currentStage = EVENT_CREATION_STAGES[stage];
  return (
    <div className="py-7 sm:p-7 flex flex-col items-center gap-12">
      <StageToggler stages={EVENT_CREATION_STAGES} />

      <AnimatePresence mode="wait">
        <motion.div
          className="px-4 sm:p-0 w-full self-start flex flex-col gap-6 sm:gap-10"
          transition={{ type: "tween", duration: 0.2 }}
          key={currentStage.name}
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 10, opacity: 0 }}
        >
          <currentStage.StageComponent />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default EventCreation;
