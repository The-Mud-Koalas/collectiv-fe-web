import { FC } from "react";
import ParticipationHeader from "./ParticipationHeader";
import ParticipationForm from "./ParticipationForm";
import { Modal } from "@/components/shared/elements";

interface EventParticipationPopupProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EventParticipationPopup: FC<EventParticipationPopupProps> = ({
    showModal,
    setShowModal,
}) => {
    return (
        <Modal open={showModal} onOverlayTap={() => setShowModal(false)}>
            <div className="border border-black rounded-2xl bg-white w-[764px] h-[659px] p-20">
                <ParticipationHeader />
                <ParticipationForm setShowModal={setShowModal}/>
            </div>
        </Modal>
    );
};

export default EventParticipationPopup;
