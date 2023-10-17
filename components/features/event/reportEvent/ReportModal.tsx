import { Button, Modal } from "@/components/shared/elements";
import { TextInputField } from "@/components/shared/forms";
import ReportFlag from "@/components/shared/svg/icons/ReportFlag";
import { COLORS } from "@/utils/constants/colors";
import { garamond, inter } from "@/utils/constants/fonts";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { FC, MouseEvent } from "react";
import { toast } from "react-toastify";
import { postRequest } from "@/lib/fetch";
import { useAppContext } from "@/context/AppContext";
import { showErrorToast } from "@/lib/toast";
import cn from "clsx";
import { RxCross2 } from "react-icons/rx";

interface ReportModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  eventId: string;
}

const ReportModal: FC<ReportModalProps> = ({
  showModal,
  setShowModal,
  eventId,
}) => {
  const form = useForm<EventReportFields>();
  const { register, handleSubmit } = form;
  const { user } = useAppContext();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: EventReportFields) => {
      if (!user) return;
      const token = await user.getIdToken();
      await postRequest({
        endpoint: "/report/submit",
        token,
        body: {
          event_id: eventId,
          remarks: data.remarks,
        },
      });
    },
    onSuccess: (user) => {
      toast.success("Report successfully Submitted!");
      form.reset();
      setShowModal(false);
    },
  });

  const onSubmit: SubmitHandler<EventReportFields> = async (data) => {
    try {
      await mutateAsync(data);
    } catch (error: unknown) {
      showErrorToast({ error: error as Error });
    }
  };

  function handleClose(e: MouseEvent<HTMLButtonElement>) {
    setShowModal(false);
  }

  return (
    <Modal open={showModal} onOverlayTap={() => setShowModal(false)}>
      <div className="rounded-2xl bg-white max-w-[764px] max-h-[659px] p-10 relative">
        <button
          onClick={handleClose}
          className="absolute right-5 top-5 hover:bg-gray-200 p-1 rounded-md"
        >
          <RxCross2 />
        </button>
        <div className="flex justify-center items-center mb-5">
          <ReportFlag color={COLORS.alert[100]} dimensions={{ width: 56 }} />
        </div>
        <h1
          className={`${garamond.className} text-primary-900 text-7xl mb-5 text-center`}
        >
          Report Event
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="max-w-[440px] mx-auto">
            <TextInputField
              field="remarks"
              label="Why are you reporting this event?"
              placeholder="Placeholder text"
              register={register}
              registerOptions={{
                required: "This field should not be left empty.",
              }}
            />
          </div>
          <div
            className={cn(
              "flex flex-wrap justify-center gap-3 mt-10",
              inter.className
            )}
          >
            <Button
              onClick={(e) => handleClose(e)}
              className="border border-primary-800 rounded-full text-primary-800 py-3 w-[254px]"
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              type="submit"
              className="border border-primary-800 bg-primary-800 flex justify-center items-center py-3 w-[254px] rounded-3xl"
            >
              <p className="text-primary-200 font-semibold text-sm">Submit</p>
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ReportModal;
