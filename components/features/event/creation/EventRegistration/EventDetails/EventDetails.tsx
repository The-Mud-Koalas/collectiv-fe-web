import React, { useEffect } from "react";
import EventCollapsible from "../EventCollapsible";
import { useEventCreationContext } from "@/context/event/EventCreationContext";
import { TextInputField } from "@/components/shared/forms";
import SelectField from "@/components/shared/forms/SelectField";
import { Button } from "@/components/shared/elements";
import MultiselectInputField from "@/components/shared/forms/MultiselectInputField";
import { FieldError } from "react-hook-form";
import LocationField from "@/components/shared/forms/LocationField";
import DateField from "@/components/shared/forms/DateField";

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
  const {
    register,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = form;

  useEffect(() => {
    console.log(errors)
  }, [errors])

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
      <TextInputField
        registerOptions={{ required: "This field should not be empty" }}
        placeholder="e.g. Potluck Party"
        label="Service Name"
        register={register}
        field="name"
        error={errors.name}
      />
      <SelectField
        rules={{ required: "Please select a category." }}
        control={control}
        field="category"
        label="Service Category"
        options={categories}
        error={errors.category}
      />
      <MultiselectInputField
        placeholder="e.g. Food, Sports"
        label="Service Tags"
        field="tags"
        control={control}
        error={errors.tags as FieldError}
        setValue={setValue}
        getValue={getValues}
      />
      <LocationField
        placeholder="e.g. Great Court"
        rules={{ required: "Please select a location." }}
        label="Service Location"
        field="location"
        setValue={setValue}
        control={control}
        error={errors.location as FieldError}
      />
      <DateField
        field="start_date_time"
        label="Service Date"
        minDate={new Date()}
        showTimeInput
        dateFormat="MMMM d, yyyy hh:mm a"
        control={control}
        error={errors.start_date_time as FieldError}
        rules={{ required: "Please select a start date."}}
      />
      <Button>Test</Button>
    </EventCollapsible>
  );
};

export default EventDetails;
