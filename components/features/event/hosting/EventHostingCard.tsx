import { FC } from "react";
import { inter } from "@/utils/constants/fonts";

interface eventHostingCardProps {
    number: number;
    locationName: string;
    locationComment: string;
}

const EventHostingCard: FC<eventHostingCardProps> = ({
    number,
    locationName,
    locationComment,
}) => {
    return (
        <div
            className={`${inter.className} rounded-2xl bg-white max-w-[554px] min-h-[157px] p-5 my-5`}
        >
            <div className="flex flex-start gap-4">
                <span className="border-2 border-black w-6 h-6 font-semibold rounded-full p-3 flex items-center justify-center mb-3">
                    {number}
                </span>
                <h1 className="font-semibold text-2xl">{locationName}</h1>
            </div>
            <p>{locationComment}</p>
        </div>
    );
};

export default EventHostingCard;
