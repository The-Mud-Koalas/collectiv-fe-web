import { Button, Modal } from "@/components/shared/elements";
import { TextInputField } from "@/components/shared/forms";
import ReportFlag from "@/components/shared/svg/icons/ReportFlag";
import { COLORS } from "@/utils/constants/colors";
import { garamond } from "@/utils/constants/fonts";
import {
    FieldError,
    SubmitErrorHandler,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { FC, MouseEvent } from "react";
import { toast } from "react-toastify";
import { postRequest } from "@/lib/fetch";
import { useAppContext } from "@/context/AppContext";

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
            console.log(eventId);
            console.log(data);
            await postRequest({
                endpoint: "/report/submit/",
                token,
                body: {
                    event_id: eventId,
                    remarks: data,
                },
            });
        },
        onSuccess: (user) => {
            toast.success("Report successfully Submitted!");
            form.reset();
            setShowModal(false);
        },
        onError: (error: any) => {
            toast.error(error.cause.message);
        },
    });

    const onSubmit: SubmitHandler<EventReportFields> = async (data) => {
        try {
            await mutateAsync(data);
        } catch (error) {
            console.log("whyyy!!");
            const err = error as Error;
            toast.error(err.cause as string);
        }
    };

    function handleClose(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setShowModal(false);
    }

    return (
        <Modal open={showModal} onOverlayTap={() => setShowModal(false)}>
            <div className="border border-black rounded-2xl bg-white max-w-[764px] max-h-[659px] p-10">
                <div className="flex justify-center items-center mb-5">
                    <ReportFlag
                        color={COLORS.alert[100]}
                        dimensions={{ width: 56 }}
                    />
                </div>
                <h1
                    className={`${garamond.className} text-primary-900 text-7xl mb-5 text-center`}
                >
                    Report Event
                </h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="max-w-[440px] mx-auto">
                        <TextInputField
                            field="text"
                            label="Why are you reporting this event?"
                            placeholder="Placeholder text"
                            register={register}
                            registerOptions={{
                                required:
                                    "This field should not be left empty.",
                            }}
                        />
                    </div>
                    <div className="flex flex-wrap justify-center gap-3 mt-10">
                        <Button
                            onClick={(e) => handleClose(e)}
                            className="border border-primary-800 rounded-full text-primary-800 py-3 w-[254px]"
                        >
                            Cancel
                        </Button>
                        <Button
                            // disabled={isLoading}
                            type="submit"
                            className="border border-primary-800 bg-primary-800 flex justify-center items-center py-3 w-[254px] rounded-3xl"
                        >
                            <p className="text-primary-200 font-semibold text-sm">
                                Register
                            </p>
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default ReportModal;
