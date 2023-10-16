import EventParticipationPopup from "@/components/features/event/participation/EventParticipationModal";
import { Button } from "@/components/shared/elements";
import { Template } from "@/components/shared/layouts";
import { FC, useState } from "react";

interface aboutProps {}

const AboutPage: FC<aboutProps> = ({}) => {
    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <Template>
            <div className="mt-20"></div>
        </Template>
    );
};

export default AboutPage;
