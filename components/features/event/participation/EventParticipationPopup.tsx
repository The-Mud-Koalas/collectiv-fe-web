import { FC } from "react";
import ParticipationHeader from "./ParticipationHeader";
import ParticipationForm from "./ParticipationForm";

interface EventParticipationPopupProps {}

const EventParticipationPopup: FC<EventParticipationPopupProps> = () => {
    return (
        <div className="border border-black rounded-2xl bg-white w-[764px] h-[659px] p-20">
            <ParticipationHeader />
            <ParticipationForm />
        </div>
    );
};

export default EventParticipationPopup;
