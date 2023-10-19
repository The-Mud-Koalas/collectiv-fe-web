import { Button } from "@/components/shared/elements";
import {
  DateField,
  FileUploadField,
  MultiselectInputField,
  SelectField,
  TextInputField,
} from "@/components/shared/forms";
import { useEventCreationContext } from "@/context/event/EventCreationContext";
import React, { useEffect } from "react";
import EventCollapsible from "../EventCollapsible";

import { Arrow } from "@/components/shared/svg/icons";
import useUpload from "@/hooks/utils/useUpload";
import { auth } from "@/lib/firebase";
import { COLORS } from "@/utils/constants/colors";
import { inter } from "@/utils/constants/fonts";
import { createEvent } from "@/utils/fetchers/event/creation";
import { capitalize } from "@/utils/helpers/formatting/capitalize";
import { numericValidator } from "@/utils/helpers/validator/numericValidator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FieldError,
  SubmitErrorHandler,
  SubmitHandler,
  useWatch,
} from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";

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
  visitedStages,
}) => {
  const {
    eventDetailsForm: form,
    categories,
    locations,
    isProject,
    tags,
    goalKind,
  } = useEventCreationContext();
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading: isLoadingSubmission } = useMutation({
    mutationFn: createEvent(queryClient),
    onSuccess: () => {},
  });

  const {
    register,
    control,
    formState: { errors },
    setValue,
    setError,
    getValues,
    handleSubmit,
    clearErrors,
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

  const {
    isLoading: isUploading,
    uploadFile,
    uploadProgress,
  } = useUpload({
    endpoint: "/event/image/upload",
    method: "POST",
  });

  const eventType = isProject ? "Project" : "Initiative";

  const onDrop = async (file: File[]) => {
    const url = URL.createObjectURL(file[0]);
    const fileRenamed = new File(
      [file[0]],
      `${nanoid()}.${file[0].name.split(".").pop()}`,
      { type: file[0].type }
    );
    const imageObject = { url, file: fileRenamed };

    setValue("image", imageObject);
    clearErrors("image");
  };

  const onSuccess: SubmitHandler<EventCreationFields> = async (data) => {
    if (data.image == null) {
      setError("image", { message: "This field should not be empty." });
      return;
    }

    const newEvent = {
      eventValues: data,
      isProject: isProject as boolean,
    };

    try {
      const event = await mutateAsync(newEvent);

      const idToken = await auth.currentUser?.getIdToken();

      const formData = new FormData();
      const image = data.image;
      formData.append("event_id", event.id);
      formData.append("event_image", image.file);
      await uploadFile(formData, idToken);
      window.scrollTo(0, 0);

      nextStage();
    } catch (error) {
      toast.error((error as Error).cause as string);
    }
  };

  const onError: SubmitErrorHandler<EventCreationFields> = (errors) => {
    const image = getValues()["image"];

    if (image == null) {
      setError("image", { message: "This field should not be empty." });
      return;
    }
  };

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
          options={categories.map((cat) => ({
            value: cat.id,
            label: capitalize(cat.name, true),
          }))}
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
          options={tags.map((tag) => ({ value: tag.id, label: tag.name }))}
        />
        <SelectField
          placeholder="e.g. Great Court"
          rules={{ required: "Please select a location." }}
          label={`${eventType} Location`}
          field="location"
          control={control}
          options={locations.map((loc) => ({ value: loc.id, label: loc.name }))}
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
              <SelectField
                field="goal_kind"
                label=""
                placeholder="e.g. food packs"
                control={control}
                options={goalKind.map((gk) => ({
                  label: gk.kind,
                  value: gk.kind,
                }))}
              />
            </div>
          </div>
        )}
        <FileUploadField
          dropzoneOptions={{
            maxFiles: 1,
            accept: {
              "image/*": [".png", ".gif", ".jpeg", ".jpg", ".bmp"],
            },
          }}
          error={errors.image as FieldError}
          field="image"
          file={image}
          uploadProgress={uploadProgress}
          isUploading={isUploading || isLoadingSubmission}
          onDrop={onDrop}
          label={`${eventType} Image`}
          description="Upload your event image here"
        />
        <Button
          className={`${(isUploading || isLoadingSubmission) && "px-12"} ${
            inter.className
          } items-center flex gap-2 justify-between rounded-full text-primary-300 bg-primary-800 px-3 py-1 w-fit justify-self-start`}
          type="submit"
          disabled={isUploading || isLoadingSubmission}
        >
          {isUploading || isLoadingSubmission ? (
            <ClipLoader
              size={20}
              color={COLORS.primary[300]}
              loading={isUploading || isLoadingSubmission}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            <>
              <p>Continue</p>
              <Arrow color={COLORS.primary[300]} dimensions={{ width: 20 }} />
            </>
          )}
        </Button>
      </form>
    </EventCollapsible>
  );
};

export default EventDetails;
