import { Button, Card } from "@/components/shared/elements";
import { Back } from "@/components/shared/svg/icons";
import { useEventCreationContext } from "@/context/event/EventCreationContext";
import { COLORS } from "@/utils/constants/colors";
import { inter } from "@/utils/constants/fonts";
import React, { useState } from "react";
import EventType from "./EventType";
import { motion } from "framer-motion";
import EventDetails from "./EventDetails";

const EventRegistration = () => {
  const { changeStage, form } = useEventCreationContext();
  const { handleSubmit } = form;
  const [regisStage, setRegisStage] = useState<number>();

  const openRegisStage = (stage: number) => () => setRegisStage(stage);
  const closeStage = () => setRegisStage(0);

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
      <form id="regis-form" className="flex flex-col gap-3 w-full" onSubmit={handleSubmit(createEvent)}>
        <p className={`${inter.className} text-primary-800 font-medium text-2xl`}>Please fill out these form below to register your event on our community space.</p>
        <Card className="w-full">
          <EventType currentStage={regisStage} openRegisStage={openRegisStage(1)} closeStage={closeStage}/>
          <motion.div className="w-full h-[2px] bg-black my-3"/>
          <EventDetails currentStage={regisStage} openRegisStage={openRegisStage(2)} closeStage={closeStage}/>
        </Card>
      </form>
    </>
  );
};

export default EventRegistration;
