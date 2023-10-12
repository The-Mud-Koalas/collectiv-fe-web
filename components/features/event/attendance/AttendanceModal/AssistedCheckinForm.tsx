import { Button } from "@/components/shared/elements";
import { TextInputField } from "@/components/shared/forms";
import { useAppContext } from "@/context/AppContext";
import { useGPSLocation } from "@/hooks/utils/useGPSLocation";
import { EMAIL_REGEX } from "@/utils/constants/regex";
import { checkInAssisted } from "@/utils/fetchers/event/attendance";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface ParticipationProps {
  emailOrPhoneNumber: string;
}

interface Props {
  onClose: () => void;
  type: SelectOption<"Participant" | "Volunteer">;
  eventId: string;
}

const AssistedCheckinForm: React.FC<Props> = ({ onClose, type, eventId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ParticipationProps>();
  const { lat, lng } = useGPSLocation();
  const { isInRN, sendMessageToRN } = useAppContext();
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: checkInAssisted(type.value),
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<ParticipationProps> = async (data) => {
    const { emailOrPhoneNumber } = data;

    if (isInRN()) {
      console.log("In react native");
      return;
    }

    const checkInAssistedValue = {
      event_id: eventId,
      latitude: lat!,
      longitude: lng!,
      participant_email_phone: emailOrPhoneNumber
    };

    console.log(checkInAssistedValue)

    try {
      await mutateAsync(checkInAssistedValue)
      router.replace(`${router.asPath}&userIdentifier=${emailOrPhoneNumber}`)
    } catch (error) {
      toast.error((error as Error).cause as string);
    }
  };

  const onError = async () => {};

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="w-full flex flex-col gap-3"
    >
      <TextInputField
        field="emailOrPhoneNumber"
        label="Email/Phone Number"
        register={register}
        registerOptions={{
          required: "This field is required",
          pattern: {
            value:
              /^(\+[0-9]{9})|([A-Za-z0-9._%\+\-]+@[a-z0-9.\-]+\.[a-z]{2,3})$/g,
            message:
              "The value supplied is not a valid email or phohne number.",
          },
        }}
        error={errors.emailOrPhoneNumber}
      />
      <div className="w-full flex gap-3 px-10">
        <Button
          onClick={onClose}
          type="button"
          className="w-full text-lg px-4 py-2 rounded-full font-medium text-primary-800 border-2"
        >
          Cancel
        </Button>
        <Button className="w-full text-lg px-4 py-2 rounded-full font-medium bg-primary-800 text-primary-300">
          Check In
        </Button>
      </div>
    </form>
  );
};

export default AssistedCheckinForm;
