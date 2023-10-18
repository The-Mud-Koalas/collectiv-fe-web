import { NumberInputField } from "@/components/shared/forms";
import { useAppContext } from "@/context/AppContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import cn from "clsx";
import { inter } from "@/utils/constants/fonts";
import { Button } from "@/components/shared/elements";
import { toast } from "react-toastify";
import { GoalMeter } from "./dataviz";
import { postRequest } from "@/lib/fetch";

interface Props {
  eventDetails: ProjectAnalytics;
  onClose: () => void;
}

const UpdateProgressModal = ({ eventDetails, onClose }: Props) => {
  const { user } = useAppContext();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{
    emailOrPhoneNumber: string;
    contributionAmount: number;
  }>();
  const updateProgress = useMutation({
    mutationFn: async (data: { contributionAmount: number }) => {
      if (!user) return;
      const token = await user.getIdToken();
      await postRequest({
        endpoint: "/event/project/progress/update",
        body: {
          event_id: eventDetails.id,
          amount_to_update: data.contributionAmount,
          type: "increase",
        },
        token
      });
    },
    onSuccess: async () => {
      toast.success("Progress successfully updated!");
      queryClient.invalidateQueries(["event-analytics", eventDetails.id]);
      reset();
    },
    onError: (e: any) => {
      toast.error(e.cause.message);
    },
  });

  const onSubmit: SubmitHandler<{
    contributionAmount: number;
  }> = async (data) => {
    updateProgress.mutate(data);
  };
  const onError = async () => {};

  return (
    <div
      style={{ width: "min(95vw, 600px)" }}
      className="rounded-md bg-white p-8 flex flex-col items-center gap-4 relative"
    >
      <p className={cn(inter.className, "text-3xl font-bold self-start")}>
        Update Progress
      </p>
      <GoalMeter
        currVal={eventDetails.progress}
        target={eventDetails.goal}
        unit={eventDetails.measurement_unit}
      />
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="w-full flex flex-col gap-3"
      >
        <NumberInputField
          field="contributionAmount"
          label={`Update Amount (${
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
            disabled={updateProgress.isLoading}
            className="text-sm lg:text-lg px-8 py-2 rounded-3xl font-medium bg-primary-800 text-primary-300 disabled:bg-gray-300 disabled:text-gray-100 disabled:cursor-not-allowed"
          >
            Update Progress
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

export default UpdateProgressModal;
