import EventParticipationPopup from "@/components/features/event/participation/EventParticipationPopup";
import { Button } from "@/components/shared/elements";
import { FC, useState } from "react";

interface aboutProps {}

const about: FC<aboutProps> = ({}) => {
    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <div className="mt-20">
            <EventParticipationPopup
                showModal={showModal}
                setShowModal={setShowModal}
            />
            <div className="flex flex-row justify-center gap-3">
                <Button
                    onClick={() => setShowModal(true)}
                    className="bg-primary-800 flex justify-center items-center py-3 w-[327px] rounded-3xl"
                >
                    <p className="text-primary-200 font-semibold text-sm">
                        Register as Participant
                    </p>
                </Button>
                <Button className="border border-primary-800 rounded-full text-primary-800 py-3 w-[327px]">
                    Register as Volunteer
                </Button>
            </div>
        </div>
    );
};

export default about;
