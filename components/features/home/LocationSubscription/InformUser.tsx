import { FC } from "react";
import { inter, garamond } from "@/utils/constants/fonts";
import InfoCard from "./InfoCard";

interface InformUserProps {}

const InformUser: FC<InformUserProps> = ({}) => {
    return (
        <div className="bg-primary-100 rounded-xl p-10">
            <div className="my-10">
                <div className="my-5">
                    <span className="w-10 h-10 bg-primary-900 rounded-full p-2 flex items-center justify-center">
                        🎯
                    </span>
                </div>
                <p className={`${garamond.className} text-2xl`}>
                    Be the first to know around you
                </p>
                <p className={`${inter.className} text-3xl font-semibold`}>
                    Here’s how we’ll use your location
                </p>
            </div>

            <div className="flex items-center justify-center gap-20">
                <InfoCard
                    title={"Arrive at a location in our Community Space"}
                    content={""}
                />
                <InfoCard
                    title={"Notified that there are events near you"}
                    content={
                        "If you're subscribed to the location, you'll receive an alert upon arrival notifying you of any events being hosted there. Participating in these events will also earn you reward points."
                    }
                />
                <InfoCard
                    title={"Turn off location tracking"}
                    content={
                        "You have the option to disable location tracking, or unsubscribe from any location to avoid receiving undesired alerts upon arrival."
                    }
                />
            </div>
        </div>
    );
};

export default InformUser;
