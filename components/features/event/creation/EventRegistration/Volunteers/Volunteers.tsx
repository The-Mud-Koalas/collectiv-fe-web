import React from "react";
import EventCollapsible from "../EventCollapsible";
import { useEventCreationContext } from "@/context/event/EventCreationContext";
import { TextInputField } from "@/components/shared/forms";
import { numericValidator } from "@/utils/helpers/validator/numericValidator";
import { Button } from "@/components/shared/elements";
import { inter } from "@/utils/constants/fonts";
import { Arrow } from "@/components/shared/svg/icons";
import { COLORS } from "@/utils/constants/colors";
import { useMutation } from "@tanstack/react-query";
import { createEvent } from "@/utils/fetchers/event/creation";
import { SubmitHandler } from "react-hook-form";
import useUpload from "@/hooks/utils/useUpload";
import { auth } from "@/lib/firebase";

interface Props {
  currentStage?: number;
  openRegisStage: () => void;
  closeStage: () => void;
  visitedStages: React.MutableRefObject<Set<number>>;
}

const VOLUNTEERS_DESCRIPTION = [
  "Planning an event that could use some extra helping hands? Complete this section to match your event with the ",
  "perfect volunteers",
  " who share your vision and passion.",
];

const Volunteers: React.FC<Props> = ({
  closeStage,
  openRegisStage,
  currentStage,
  visitedStages,
}) => {
  const { volunteersForm, eventDetailsForm, isProject, changeStage } = useEventCreationContext();
  const { register, handleSubmit } = volunteersForm;
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {},
  });
  const { isLoading: isUploading, uploadFile } = useUpload({endpoint: "/event/image/upload", method: "POST"});

  const onSubmit: SubmitHandler<VolunteerFields> = async (volunteerValues) => {
    const newEvent = {
      eventValues: eventDetailsForm.getValues(),
      volunteerValues,
      isProject
    };

    const event = await mutateAsync(newEvent);
    
    const idToken = await auth.currentUser?.getIdToken();
    
    const formData = new FormData();
    const image = eventDetailsForm.getValues()["image"]
    formData.append("event_id", event.id);
    formData.append("event_image", image.file)
    await uploadFile(formData, idToken);
    
    changeStage(3)();
   
  };
  return (
    <EventCollapsible
      isCollapsibleEnabled={Math.max(...visitedStages.current) + 1 >= 3}
      sectionId="volunteers"
      sectionTitle="Volunteers"
      description={VOLUNTEERS_DESCRIPTION}
      isOpened={currentStage === 3}
      openCollapsible={openRegisStage}
      closeCollapsible={closeStage}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <TextInputField
          field="min_num_of_volunteers"
          label="How many volunteers do you need?"
          register={register}
          registerOptions={{
            validate: {
              isNumeric: numericValidator("This field must be a number."),
            },
          }}
        />
        <Button
          className={`${inter.className} items-center flex gap-2 justify-between rounded-full text-primary-300 bg-primary-800 px-3 py-1 w-fit justify-self-start`}
          type="submit"
          disabled={isLoading || isUploading}
        >
          <p>Continue</p>
          <Arrow color={COLORS.primary[300]} dimensions={{ width: 20 }} />
        </Button>
      </form>
    </EventCollapsible>
  );
};

export default Volunteers;
