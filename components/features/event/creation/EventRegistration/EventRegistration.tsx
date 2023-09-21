import { Button, Card } from "@/components/shared/elements";
import { Back } from "@/components/shared/svg/icons";
import { useEventCreationContext } from "@/context/event/EventCreationContext";
import { COLORS } from "@/utils/constants/colors";
import { inter } from "@/utils/constants/fonts";
import React, { useRef, useState } from "react";
import EventType from "./EventType";
import { motion } from "framer-motion";
import EventDetails from "./EventDetails";
import Volunteers from "./Volunteers";

const EventRegistration = () => {
  const { changeStage } = useEventCreationContext();
  const [regisStage, setRegisStage] = useState<number>();

  const closeStage = () => setRegisStage(0);
  const visitedStages = useRef(new Set<number>());
  const openRegisStage = (stage: number) => () => {
    setRegisStage(stage);
    visitedStages.current.add(stage);
  }

  const createEvent = (data: EventCreationFields) => {
    console.log(data)
  }

  return (
    <>
      <section id="regis-header" className="flex flex-col gap-3">
        <Button onClick={changeStage(0)}>
          <Back dimensions={{ width: 32 }} color={COLORS.primary[800]} />
        </Button>
        <h1
          className={`${inter.className} text-primary-800 font-bold text-5xl`}
        >
          Register your event now!
        </h1>
      </section>
      <div id="regis-form" className="flex flex-col gap-3 w-full">
        <p className={`${inter.className} text-primary-800 font-medium text-2xl`}>Please fill out these form below to register your event on our community space.</p>
        <Card className="w-full">
          <EventType currentStage={regisStage} openRegisStage={openRegisStage(1)} closeStage={closeStage}/>
          <motion.div className="w-full h-[2px] bg-black my-3"/>
          <EventDetails currentStage={regisStage} openRegisStage={openRegisStage(2)} closeStage={closeStage} nextStage={openRegisStage(3)} visitedStages={visitedStages}/>
          <motion.div className="w-full h-[2px] bg-black my-3"/>
          <Volunteers currentStage={regisStage} openRegisStage={openRegisStage(3)} closeStage={closeStage} visitedStages={visitedStages}/>
        </Card>
      </div>
    </>
  );
};

export default EventRegistration;
