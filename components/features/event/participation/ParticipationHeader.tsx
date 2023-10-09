import GreenTick from "@/components/shared/svg/icons/GreenTick";
import { inter, garamond } from "@/utils/constants/fonts";
import { FC } from "react";

interface ParticipationHeaderProps {}

const ParticipationHeader: FC<ParticipationHeaderProps> = ({}) => {
    return (
        <div className="text-center mx-auto">
            <div className="flex justify-center items-center">
                <GreenTick />
            </div>
            <h1
                className={`${garamond.className} text-7xl text-primary-900 my-4`}
            >
                Register as Participant
            </h1>
            <p className={`${inter.className} text-xl text-primary-800`}>
                Are you sure you want to register as a participant?
            </p>
            <p className={`${inter.className} text-xl text-primary-800`}>
                This action cannot be undone.
            </p>
        </div>
    );
};

export default ParticipationHeader;
