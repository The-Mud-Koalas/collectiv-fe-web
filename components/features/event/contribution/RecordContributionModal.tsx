import { Button } from "@/components/shared/elements";
import { NumberInputField, TextInputField } from "@/components/shared/forms";
import { useAppContext } from "@/context/AppContext";
import { postRequest } from "@/lib/fetch";
import { inter } from "@/utils/constants/fonts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import cn from "clsx";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";

interface Props {
  eventDetails: EventDetail;
  onClose: () => void;
}

const RecordContributionModal = ({ eventDetails, onClose }: Props) => {
  const { user } = useAppContext();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<{
    emailOrPhoneNumber: string;
    contributionAmount: number;
  }>();

  const recordContribution = useMutation({
    mutationFn: async (data: {
      emailOrPhoneNumber: string;
      contributionAmount: number;
    }) => {
      if (!user) return;
      const token = await user.getIdToken();
      await postRequest({
        endpoint: "/participation/project/contribution/register",
        body: {
          event_id: eventDetails.id,
          contributor_email_phone: data.emailOrPhoneNumber,
          amount_contributed: data.contributionAmount,
        },
        token
      });
    },
    onSuccess: async () => {
      toast.success('Contribution successfully recorded!')
      queryClient.invalidateQueries(['event-analytics', eventDetails.id])
      reset();
    },
    onError: (e: any) => {
      toast.error(e.cause.message)
    }
  });

  const onSubmit: SubmitHandler<{
    emailOrPhoneNumber: string;
    contributionAmount: number;
  }> = async (data) => {
    recordContribution.mutate(data);
  };

  const onError = async () => {};

  return (
    <div
      style={{ width: "min(95vw, 600px)" }}
      className="rounded-md bg-white p-8 flex flex-col items-center gap-2 relative"
    >
      <p className={cn(inter.className, "text-3xl font-bold self-start")}>
        Record Contribution
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
              value:
                /^(\+[0-9]{9})|([A-Za-z0-9._%\+\-]+@[a-z0-9.\-]+\.[a-z]{2,3})$/g,
              message:
                "The value supplied is not a valid email or phone number.",
            },
          }}
          error={errors.emailOrPhoneNumber}
        />
        <NumberInputField
          field="contributionAmount"
          label={`Contribution Amount (${
            (eventDetails as ProjectDetail).measurement_unit
          })`}
          register={register}
          registerOptions={{
            required: "This field is required",
            valueAsNumber: true,
          }}
          error={errors.emailOrPhoneNumber}
        />
        <div className="w-full flex items-center justify-center gap-3 px-10">
          <Button
            onClick={onClose}
            type="button"
            className="text-sm lg:text-lg px-8 py-2 rounded-3xl font-medium text-primary-800 border-2"
          >
            Cancel
          </Button>
          <Button
            disabled={recordContribution.isLoading}
            className="text-sm lg:text-lg px-8 py-2 rounded-3xl font-medium bg-primary-800 text-primary-300 disabled:bg-gray-300 disabled:text-gray-100 disabled:cursor-not-allowed"
          >
            Record Contribution
          </Button>
        </div>
      </form>
      <button
        onClick={onClose}
        className="absolute right-5 top-5 hover:bg-gray-200 p-1 rounded-md"
      >
        <RxCross2 />
      </button>
    </div>
  );
};

export default RecordContributionModal;
