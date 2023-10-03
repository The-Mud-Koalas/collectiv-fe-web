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
  AsyncSelectField,
} from "@/components/shared/forms";
import { Button } from "@/components/shared/elements";

import {
  FieldError,
  SubmitErrorHandler,
  SubmitHandler,
  useWatch,
} from "react-hook-form";
import { numericValidator } from "@/utils/helpers/validator/numericValidator";
import { inter } from "@/utils/constants/fonts";
import { getProjectUnitGoals, getTags } from "@/utils/fetchers/event/creation";
import { Arrow } from "@/components/shared/svg/icons";
import { COLORS } from "@/utils/constants/colors";
import useUpload from "@/hooks/utils/useUpload";

interface Props {
  currentStage?: number;
  openRegisStage: () => void;
  nextStage: () => void;
  closeStage: () => void;
  visitedStages: React.MutableRefObject<Set<number>>;
}

const EVENT_DETAILS = [
  "Enter your event details to ensure that your event receives the ",
  "visibility",
  " it deserves and reaches the right ",
  "audience of enthusiastic participants.",
];

const GOAL_OPTIONS = ["m", "kg", "unit", "AUD"].map((unit) => ({
  value: unit,
  label: unit,
}));

const EventDetails: React.FC<Props> = ({
  closeStage,
  openRegisStage,
  currentStage,
  nextStage,
  visitedStages
}) => {
  const {
    eventDetailsForm: form,
    categories,
    isProject,
  } = useEventCreationContext();

  const { isLoading, uploadFile, uploadProgress } = useUpload({ endpoint: "/event/image/upload", method: "POST" })

  const {
    register,
    control,
    formState: { errors },
    setValue,
    setError,
    getValues,
    handleSubmit,
    clearErrors
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

  const onSuccess: SubmitHandler<EventCreationFields> = (data) => {
    if (data.image == null) {
      setError("image", { message: "This field should not be empty." });
      return;
    }

    nextStage();
  };

  const onError: SubmitErrorHandler<EventCreationFields> = (errors) => {
    const image = getValues()["image"]

    if (image == null) {
      setError("image", { message: "This field should not be empty." });
      return;
    }
  }

  return (
    <EventCollapsible
      isCollapsibleEnabled={Math.max(...visitedStages.current) + 1 >= 2}
      sectionId="event-details"
      sectionTitle="Event Details"
      description={EVENT_DETAILS}
      isOpened={currentStage === 2}
      openCollapsible={openRegisStage}
      closeCollapsible={closeStage}
    >
      <form
        className="w-full flex flex-col gap-3"
        onSubmit={handleSubmit(onSuccess, onError)}
      >
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
          fetcher={getTags}
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
          <div className="">
            <p
              className={`${inter.className} text-sm sm:text-base font-medium`}
            >
              Project Goals
            </p>
            <div className="flex items-end gap-2 w-full">
              <div className="w-1/6">
                <TextInputField
                  field="project_goal"
                  label=""
                  register={register}
                  placeholder="e.g. 100"
                  error={errors.project_goal}
                  registerOptions={{
                    validate: {
                      isNumeric: numericValidator(
                        "This field must be a number"
                      ),
                    },
                  }}
                />
              </div>
              <div className="w-1/4">
                <SelectField
                  field="goal_measurement_unit"
                  label=""
                  control={control}
                  options={GOAL_OPTIONS}
                  error={errors.project_goal}
                />
              </div>
              <AsyncSelectField
                fetcher={getProjectUnitGoals}
                field="goal_measurement"
                label=""
                placeholder="e.g. bottles collected"
                control={control}
              />
            </div>
          </div>
        )}
        <FileUploadField
          // registerOptions={{ required: "This field should not be empty." }}
          error={errors.image as FieldError}
          field="image"
          file={image}
          uploadProgress={uploadProgress}
          isUploading={isLoading}
          onDrop={onDrop}
          label={`${eventType} Image`}
          description="Upload your event image here"
        />
        <Button
          className={`${inter.className} items-center flex gap-2 justify-between rounded-full text-primary-300 bg-primary-800 px-3 py-1 w-fit justify-self-start`}
          type="submit"
        >
          <p>Continue</p>
          <div className="rotate-90">
            <Arrow color={COLORS.primary[300]} dimensions={{ width: 20 }} />
          </div>
        </Button>
      </form>
    </EventCollapsible>
  );
};

export default EventDetails;
