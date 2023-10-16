import { Button, Modal } from "@/components/shared/elements";
import GreenTick from "@/components/shared/svg/icons/GreenTick";
import { useAppContext } from "@/context/AppContext";
import { postRequest } from "@/lib/fetch";
import { garamond, inter } from "@/utils/constants/fonts";
import { useMutation } from "@tanstack/react-query";
import { FC } from "react";
import { toast } from "react-toastify";
interface EventParticipationPopupProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    eventId: string;
}

const EventParticipationPopup: FC<EventParticipationPopupProps> = ({
    showModal,
    setShowModal,
    eventId,
}) => {
    const { user } = useAppContext();

    const handleRegister = useMutation({
        mutationFn: async () => {
            if (!user) return null;
            const token = await user.getIdToken();
            await postRequest({
                endpoint: "/participation/participant/register/",
                body: {
                    event_id: eventId,
                },
                token,
            });
        },
        onSuccess: () => {
            setShowModal(false);
            toast.success("You have been registered to this event!");
        },
        onError: (e: any) => {
            toast.error(e.cause.message);
        },
    });

    return (
        <Modal open={showModal} onOverlayTap={() => setShowModal(false)}>
            <div className="border border-black rounded-2xl bg-white max-w-[764px] px-10 py-12">
                <div className="text-center mx-auto mb-10">
                    <div className="flex justify-center items-center">
                        <GreenTick />
                    </div>
                    <h1
                        className={`${garamond.className} text-7xl text-primary-900 my-7 `}
                    >
                        Register as Participant
                    </h1>
                    <p
                        className={`${inter.className} text-xl text-primary-800`}
                    >
                        Are you sure you want to register as a participant?
                    </p>
                    <p
                        className={`${inter.className} text-xl text-primary-800`}
                    >
                        This action cannot be undone.
                    </p>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                    <Button
                        onClick={() => setShowModal(false)}
                        className="border border-primary-800 rounded-full text-primary-800 py-3 min-w-[327px]"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => handleRegister.mutate()}
                        type="submit"
                        className="bg-primary-800 flex justify-center items-center py-3 min-w-[327px] rounded-3xl"
                    >
                        <p className="text-primary-200 font-semibold text-sm">
                            Register
                        </p>
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default EventParticipationPopup;
