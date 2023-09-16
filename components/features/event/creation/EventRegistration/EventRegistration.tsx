import { Button, Card } from "@/components/shared/elements";
import { Back } from "@/components/shared/svg/icons";
import { useEventCreationContext } from "@/context/event/EventCreationContext";
import { COLORS } from "@/utils/constants/colors";
import { inter } from "@/utils/constants/fonts";
import React, { useState } from "react";
import EventType from "./EventType";

const EventRegistration = () => {
  const { changeStage, form } = useEventCreationContext();
  const [regisStage, setRegisStage] = useState(0);
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
      <form id="regis-form" className="flex flex-col gap-3 w-full">
        <p className={`${inter.className} text-primary-800 font-medium text-2xl`}>Please fill out these form below to register your event on our community space.</p>
        <Card className="w-full">
          <EventType currentStage={regisStage}/>
        </Card>
      </form>
    </>
  );
};

export default EventRegistration;
