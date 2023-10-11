import { Button } from "@/components/shared/elements";
import { TextInputField } from "@/components/shared/forms";
import { inter } from "@/utils/constants/fonts";
import { EMAIL_REGEX } from "@/utils/constants/regex";
import { phoneOrEmailValidator } from "@/utils/helpers/validator/phoneOrEmailValidator";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {
  eventId: string;
  onCheckInComplete: () => void;
  onClose: () => void;
}

interface ParticipationProps {
  emailOrPhoneNumber: string;
}

const VolunteerAttendanceModal: React.FC<Props> = ({
  eventId,
  onCheckInComplete,
  onClose,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ParticipationProps>();
  const userIdfier = searchParams.get("userIdentifier");

  const onSubmit: SubmitHandler<ParticipationProps> = async (data) => {
    const { emailOrPhoneNumber } = data;

    if (EMAIL_REGEX.test(emailOrPhoneNumber)) {
      console.log("It is email");
      return;
    }
  };

  const onError = async () => {};

  return (
    <div
      className={`${inter.className} rounded-2xl flex flex-col bg-white w-full h-1/2 px-8 py-6 gap-3`}
    >
      {userIdfier == null ? (
        <>
          <h1 className="font-semibold text-4xl">
            Participant Arrival Check-In
          </h1>
          <p className="text-lg font-normal">
            Enter the phone number or email the participant registered with.
          </p>

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
                  value: /^(\+[0-9]{9})|([A-Za-z0-9._%\+\-]+@[a-z0-9.\-]+\.[a-z]{2,3})$/g,
                  message:
                    "The value supplied is not a valid email or phohne number.",
                },
              }}
              error={errors.emailOrPhoneNumber}
            />
            <Button className="w-full text-lg px-4 py-2 rounded-full font-semibold bg-primary-800 text-primary-300">
              Check In
            </Button>
          </form>
        </>
      ) : (
        <div>
          <h1>{userIdfier}</h1>
        </div>
      )}
    </div>
  );
};

export default VolunteerAttendanceModal;
