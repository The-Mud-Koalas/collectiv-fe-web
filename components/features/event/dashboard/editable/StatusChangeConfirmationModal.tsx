import { inter } from "@/utils/constants/fonts";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import cn from "clsx";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Button } from "@/components/shared/elements";
import { capitalize } from "@/utils/helpers/formatting/capitalize";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "@/context/AppContext";
import { postRequest } from "@/lib/fetch";
import { toast } from "react-toastify";

interface Props {
  eventDetails: EventDetail;
  onClose: () => void;
  type: "start" | "cancel" | "complete";
}

const StatusChangeConfirmationModal = ({
  eventDetails,
  onClose,
  type,
}: Props) => {
  const { user } = useAppContext();
  const queryClient = useQueryClient();
  const changeStatus = useMutation({
    mutationFn: async () => {
      if (!user) return;
      const token = await user.getIdToken();
      let status = "On Going";
      switch (type) {
        case "cancel": {
          status = "Cancelled";
          break;
        }
        case "complete": {
          status = "Completed";
          break;
        }
      }
      await postRequest({
        endpoint: "/event/status/update",
        token,
        body: { event_id: eventDetails.id, new_status: status },
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["event-details", eventDetails.id],
      });
      onClose();
      toast.info("Successfully changed event status!");
    },
  });

  let warningText =
    "Once you start your event you will not be able to cancel it. Starting an event will also allow Participants and Volunteers to check in and attend the event.";

  switch (type) {
    case "cancel": {
      warningText =
        "This action is irreversible. Cancelling an event will not allow you to start the event again, and would require you to create a new event if you wish to do so.";
      break;
    }
    case "complete": {
      warningText =
        "This action is irreversible. Completing an event will not allow you to start the event again. We hope you had a wonderful event!";
      break;
    }
  }

  return (
    <div
      style={{ width: "min(90vw, 600px)" }}
      className="rounded-md py-8 px-8 bg-white flex flex-col items-center gap-4 relative"
    >
      <p className={cn(inter.className, "text-3xl font-bold self-start")}>
        {capitalize(type, true)} your event?
      </p>
      <div
        className={cn("w-full rounded-md p-4 flex items-center gap-4", {
          "bg-primary-100": type === "start",
          "bg-red-200": type === "cancel",
          "bg-secondary-200": type === "complete",
        })}
      >
        <AiOutlineInfoCircle
          className={cn("lg:text-3xl text-xl", {
            "text-primary-500": type === "start",
            "text-red-500": type === "cancel",
            "text-secondary-400": type === "complete",
          })}
        />
        <p
          className={cn("lg:text-sm text-xs font-semibold text-justify", {
            "text-primary-500": type === "start",
            "text-red-500": type === "cancel",
            "text-secondary-400": type === "complete",
          })}
        >
          {warningText}
        </p>
      </div>

      <button
        onClick={onClose}
        className="absolute right-5 top-5 hover:bg-gray-200 p-1 rounded-md"
      >
        <RxCross2 />
      </button>
      <div className="self-end flex items-center gap-2">
        <Button
          onClick={onClose}
          type="button"
          className="text-sm lg:text-lg px-8 py-2 rounded-3xl font-medium text-primary-800 border-2"
        >
          Nevermind
        </Button>
        <Button
          onClick={() => changeStatus.mutate()}
          disabled={changeStatus.isLoading}
          className={cn(
            "text-sm lg:text-lg px-8 py-2 rounded-3xl font-medium disabled:bg-gray-300 disabled:text-gray-100 disabled:cursor-not-allowed",
            {
              "bg-primary-800 text-primary-300": type === "start",
              "bg-red-500 text-white": type === "cancel",
              "bg-secondary-500 text-secondary-200": type === "complete",
            }
          )}
        >
          {capitalize(type, true)} the Event!
        </Button>
      </div>
    </div>
  );
};

export default StatusChangeConfirmationModal;
