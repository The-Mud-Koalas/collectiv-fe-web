import React, { useEffect, useState } from "react";
import EventCollapsible from "../EventCollapsible";
import { useEventCreationContext } from "@/context/event/EventCreationContext";
import {
  TextInputField,
  SelectField,
  MultiselectInputField,
  LocationField,
  DateField,
  FileUploadField,
} from "@/components/shared/forms";
import { Button } from "@/components/shared/elements";

import { FieldError, useWatch } from "react-hook-form";
import { numericValidator } from "@/utils/helpers/validator/numericValidator";

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
  const { form, categories, isProject } = useEventCreationContext();
  const {
    register,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = form;

  const startDate = useWatch({
    control,
    name: "start_date_time",
    defaultValue: new Date(),
  });

  const image = useWatch({
    control,
    name: "image",
  });

  useEffect(() => {
    if (startDate > getValues().end_date_time) {
      setValue("end_date_time", startDate);
    }
  }, [startDate, getValues, setValue]);

  const eventType = isProject ? "Project" : "Initiative";

  const onDrop = async (file: File[]) => {
    const url = URL.createObjectURL(file[0]);
    const imageObject = { url, file: file[0] };
    setValue("image", imageObject);
  };

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
      <div className="w-full flex flex-col gap-3">
        <TextInputField
          registerOptions={{ required: "This field should not be empty" }}
          placeholder="e.g. Potluck Party"
          label={`${eventType} Name`}
          register={register}
          field="name"
          error={errors.name}
        />
        <SelectField
          rules={{ required: "Please select a category." }}
          control={control}
          field="category"
          label={`${eventType} Category`}
          options={categories}
          error={errors.category as FieldError}
        />
        <MultiselectInputField
          placeholder="e.g. Food, Sports"
          label={`${eventType} Tags`}
          field="tags"
          control={control}
          error={errors.tags as FieldError}
          setValue={setValue}
          getValue={getValues}
        />
        <LocationField
          placeholder="e.g. Great Court"
          rules={{ required: "Please select a location." }}
          label={`${eventType} Location`}
          field="location"
          setValue={setValue}
          control={control}
          error={errors.location as FieldError}
        />
        <DateField
          field="start_date_time"
          label={`${eventType} Start Date`}
          minDate={new Date()}
          minTime={new Date()}
          showTimeInput
          dateFormat="MMMM d, yyyy hh:mm a"
          control={control}
          error={errors.start_date_time as FieldError}
          rules={{ required: "Please select a start date." }}
        />
        <DateField
          field="end_date_time"
          label={`${eventType} End Date`}
          minDate={startDate}
          minTime={startDate}
          showTimeInput
          dateFormat="MMMM d, yyyy hh:mm a"
          control={control}
          error={errors.start_date_time as FieldError}
          rules={{ required: "Please select a start date." }}
        />
        <TextInputField
          field="description"
          label={`${eventType} Description`}
          register={register}
          placeholder="Describe your event's goals and objectives"
        />
        {isProject && (
          <div className="flex items-end gap-2 w-full">
            <TextInputField
              field="project_goal"
              label="Project Goal"
              register={register}
              placeholder="e.g. 100"
              error={errors.project_goal}
              registerOptions={{
                validate: {
                  isNumeric: numericValidator("This field must be a number"),
                },
              }}
            />
            <TextInputField
              field="goal_measurement_unit"
              label=""
              register={register}
              placeholder="e.g. bottles collected"
              error={errors.project_goal}
            />
          </div>
        )}
        <FileUploadField
          registerOptions={{ required: "This field should not be empty." }}
          error={errors.image as FieldError}
          field="image"
          file={image}
          uploadProgress={50}
          isUploading={true}
          onDrop={onDrop}
          label={`${eventType} Image`}
          description="Upload your event image here"
        />
        <Button>Test</Button>
      </div>
    </EventCollapsible>
  );
};

export default EventDetails;
