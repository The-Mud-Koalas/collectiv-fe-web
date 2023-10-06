import { Button, Card } from "@/components/shared/elements";
import { Back } from "@/components/shared/svg/icons";
import { useEventCreationContext } from "@/context/event/EventCreationContext";
import { COLORS } from "@/utils/constants/colors";
import { inter } from "@/utils/constants/fonts";
import React, { useEffect, useRef, useState } from "react";
import EventType from "./EventType";
import { motion } from "framer-motion";
import EventDetails from "./EventDetails";
import Volunteers from "./Volunteers";

interface Props {
  event?: NewEventFields;
}

const EventRegistration: React.FC<Props> = ({ event }) => {
  const { changeStage, populateFormValues, changeIsProject, isProject } =
    useEventCreationContext();
  const [regisStage, setRegisStage] = useState<number>();

  useEffect(() => {
    if (event == null) return;

    populateFormValues(event);
  }, [event, populateFormValues]);

  const closeStage = () => {
    setRegisStage(0);
    if (isProject == null) changeIsProject(false)();
  };
  const visitedStages = useRef(
    event == null ? new Set<number>() : new Set([1, 2, 3])
  );
  const openRegisStage = (stage: number) => () => {
    setRegisStage(stage);
    if (isProject == null) changeIsProject(false)();
    visitedStages.current.add(stage);
  };

  return (
    <>
      <section id="regis-header" className="flex flex-col gap-3">
        <Button onClick={changeStage(0)}>
          <Back dimensions={{ width: 32 }} color={COLORS.primary[800]} />
        </Button>
        <h1
          className={`${inter.className} text-primary-800 font-bold text-2xl sm:text-5xl`}
        >
          Register your event now!
        </h1>
      </section>
      <div id="regis-form" className="flex flex-col gap-3 w-full">
        <p
          className={`${inter.className} text-primary-800 font-medium text-base sm:text-2xl`}
        >
          Please fill out these form below to register your event on our
          community space.
        </p>
        <Card className="w-full my-3">
          <EventType
            currentStage={regisStage}
            openRegisStage={openRegisStage(1)}
            closeStage={closeStage}
          />
          <motion.div className="w-full h-[2px] bg-black my-3" />
          <EventDetails
            currentStage={regisStage}
            openRegisStage={openRegisStage(2)}
            closeStage={closeStage}
            nextStage={openRegisStage(3)}
            visitedStages={visitedStages}
          />
          <motion.div className="w-full h-[2px] bg-black my-3" />
          <Volunteers
            currentStage={regisStage}
            openRegisStage={openRegisStage(3)}
            closeStage={closeStage}
            visitedStages={visitedStages}
          />
        </Card>
      </div>
    </>
  );
};

export default EventRegistration;
