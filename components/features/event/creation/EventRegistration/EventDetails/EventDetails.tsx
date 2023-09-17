import React from "react";
import EventCollapsible from "../EventCollapsible";
import { useEventCreationContext } from "@/context/event/EventCreationContext";
import { TextInputField } from "@/components/shared/forms";
import SelectField from "@/components/shared/forms/SelectField";

interface Props {
  currentStage?: number;
  openRegisStage: () => void;
  closeStage: () => void;
}

const EVENT_DETAILS = [
  "Enter your event details to ensure that your event receives the ",
  "visibility",
  " it deserves and reaches the right ",
  "audience of enthusiastic participants.",
];

const EventDetails: React.FC<Props> = ({
  closeStage,
  openRegisStage,
  currentStage,
}) => {
  const { form, categories } = useEventCreationContext();
  const { register, control } = form;
  return (
    <EventCollapsible
      isCollapsibleEnabled
      sectionId="event-details"
      sectionTitle="Event Details"
      description={EVENT_DETAILS}
      isOpened={currentStage === 2}
      openCollapsible={openRegisStage}
      closeCollapsible={closeStage}
    >
      <TextInputField label="Service Name" register={register} field="name" />
      <SelectField control={control} field="category" label="Service Category" options={categories}/>
    </EventCollapsible>
  );
};

export default EventDetails;
