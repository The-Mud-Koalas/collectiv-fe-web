import { Button } from "@/components/shared/elements";
import { TextInputField } from "@/components/shared/forms";
import { useGPSLocation } from "@/hooks/utils/useGPSLocation";
import { showErrorToast } from "@/lib/toast";
import { COLORS } from "@/utils/constants/colors";
import { garamond, inter } from "@/utils/constants/fonts";
import { checkOutAssisted } from "@/utils/fetchers/event/attendance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { BeatLoader } from "react-spinners";

interface Props {
  eventId: string;
  onClose: () => void;
}

interface FormFields {
  emailOrPhoneNumber: string;
}

const CheckoutModal: React.FC<Props> = ({ onClose, eventId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();
  const { lat, lng, isGettingGPS } = useGPSLocation();
  const queryClient = useQueryClient();
  const [isCheckedOut, setCheckedOut] = useState(false);

  const { mutateAsync } = useMutation({
    mutationFn: checkOutAssisted(queryClient),
    onError: (error: Error) => showErrorToast({ error }),
  });

  const onSubmit = async (data: FormFields) => {
    const checkOutData = {
      event_id: eventId,
      latitude: lat,
      longitude: lng,
      participant_email_phone: data.emailOrPhoneNumber,
    };

    await mutateAsync(checkOutData);
    setCheckedOut(true);
  };

  if (isGettingGPS)
    return (
      <div className="w-full py-5 flex justify-center">
        <BeatLoader color={COLORS.primary[800]} />
      </div>
    );

  const isLocationDisabled = lat == null || lng == null;
  if (isLocationDisabled)
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
    <div
      style={{ width: "min(90vw, 600px)" }}
      className={`${inter.className} relative rounded-2xl bg-white px-8 py-10`}
    >
      <AnimatePresence mode="popLayout">
        {!isCheckedOut ? (
          <motion.div
            className="flex flex-col gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="checkout"
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 hover:bg-gray-200 p-1 rounded-md"
            >
              <RxCross2 />
            </button>
            <h1 className="font-semibold text-3xl">Depart Check-Out</h1>
            <p className="text-sm lg:text-base font-normal">
              Record check-out by inputting user information manually.
            </p>

            <form
              className="w-full flex flex-col gap-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextInputField
                label="Email / Phone Number"
                field="emailOrPhoneNumber"
                register={register}
                registerOptions={{
                  required: "This field is required",
                  pattern: {
                    value:
                      /^(\+[0-9]{9})|([A-Za-z0-9._%\+\-]+@[a-z0-9.\-]+\.[a-z]{2,3})$/g,
                    message:
                      "The value supplied is not a valid email or phone number.",
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
                  Check Out
                </Button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col items-center gap-3"
            key="thanks"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="28"
                cy="28"
                r="26.5"
                fill="#BAF67E"
                stroke="#163300"
                strokeWidth="3"
              />
              <path
                d="M37.9551 20.5332L24.2662 34.2221L18.0439 27.9999"
                stroke="#163300"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <h1 className={`${garamond.className} font-normal text-4xl`}>
              Check Out Successful
            </h1>
            <Button
              onClick={onClose}
              className="self-center bg-primary-800 text-primary-300 font-medium items-center px-20 rounded-full gap-4 py-2 text-base w-fit justify-center flex"
            >
              Close
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CheckoutModal;
