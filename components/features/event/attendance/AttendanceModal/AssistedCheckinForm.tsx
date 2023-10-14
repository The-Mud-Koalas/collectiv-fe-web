import { Button } from "@/components/shared/elements";
import { TextInputField } from "@/components/shared/forms";
import { Arrow } from "@/components/shared/svg/icons";
import { useAppContext } from "@/context/AppContext";
import { useGPSLocation } from "@/hooks/utils/useGPSLocation";
import { showErrorToast } from "@/lib/toast";
import { COLORS } from "@/utils/constants/colors";
import { checkInAssisted } from "@/utils/fetchers/event/attendance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
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
  const queryClient = useQueryClient();
  const { lat, lng, isGettingGPS } = useGPSLocation();
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: checkInAssisted(type.value, queryClient),
    onError: (error: Error) => showErrorToast({ error })
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<ParticipationProps> = async (data) => {
    const { emailOrPhoneNumber } = data;

    const checkInAssistedValue = {
      event_id: eventId,
      latitude: lat!,
      longitude: lng!,
      [type.value === "Participant" ? "participant_email_phone" : "volunteer_email_phone"]: emailOrPhoneNumber,
    };

    try {
      await mutateAsync(checkInAssistedValue);
      router.replace(`${router.asPath}&userIdentifier=${emailOrPhoneNumber}`);
    } catch (error) {
      toast.error((error as Error).cause as string);
    }
  };

  const onError = async () => {};

  if (isGettingGPS)
    return (
      <div className="w-full py-5 flex justify-center">
        <BeatLoader color={COLORS.primary[800]} />
      </div>
    );

  const isLocationDisabled = lat == null || lng == null;

  if (isLocationDisabled && type.value === "Participant")
    return (
      <div className="w-full flex flex-col gap-3">
        <p className="text-sm lg:text-base font-normal">
          You need to enable access to your device location before allowing
          participants to check in. You can do so by changing the locations
          permissions of the device settings.
        </p>
      </div>
    );

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
            message: "The value supplied is not a valid email or phone number.",
          },
        }}
        error={errors.emailOrPhoneNumber}
      />
      <div className="w-full flex gap-3 px-10">
        <Button
          onClick={onClose}
          type="button"
          className="w-full text-sm sm:text-base lg:text-lg px-4 py-2 rounded-full font-medium text-primary-800 border-2"
        >
          Cancel
        </Button>
        <Button className="w-full text-sm sm:text-base lg:text-lg px-4 py-2 rounded-full font-medium bg-primary-800 text-primary-300">
          Check In
        </Button>
      </div>
    </form>
  );
};

export default AssistedCheckinForm;
