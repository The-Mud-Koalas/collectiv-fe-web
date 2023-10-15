import { FC, useState } from "react";
import { inter } from "@/utils/constants/fonts";
import SelectableButton from "./SelectableButton";
import DynamicInfo from "./DynamicInfo";
import ContributionPhone from "@/components/shared/images/contributionPhone.png";
import HostingPhone from "@/components/shared/images/hostingPhone.png";
import ForumPhone from "@/components/shared/images/forumPhone.png";
import RewardPhone from "@/components/shared/images/rewardPhone.png";
import GeolocationPhone from "@/components/shared/images/geolocationPhone.png";
import { StaticImageData } from "next/image";
interface AdditionalInfoProps {}

const AdditionalInfo: FC<AdditionalInfoProps> = ({}) => {
    const [selectedButton, setSelectedButton] = useState<number>(0);

    type ButtonContentMap = {
        id: number;
        label: string;
        badge: string;
        title: string;
        content: string;
        image: StaticImageData;
    };

    const buttonContentMap: ButtonContentMap[] = [
        {
            id: 0,
            label: "Event Notification alert",
            badge: "Geolocation Tracker",
            title: "Receive alerts on event near you",
            content:
                "We sends notifications and alerts to the user about events happening near their current location. This feature provides real-time information without the need for manual searching or browsing.",
            image: GeolocationPhone,
        },
        {
            id: 1,
            label: "Register as participant or volunteer",
            badge: "Contribution",
            title: "Register as participant or Volunteer",
            content:
                "You can effortlessly register as a participant or volunteer for our projects or events and connect with fellow community members. You’ll gain access to a multitude of benefits, allowing you to make the most out of your experience.",
            image: ContributionPhone,
        },
        {
            id: 2,
            label: "Attend events and be rewarded",
            badge: "Reward",
            title: "Attend events and be rewarded",
            content:
                "Make sure to attend the events or actively contribute to the registered project, as you'll earn valuable points that can be redeemed for gifts at your favorite store. Remember to check out after your participation.",
            image: RewardPhone,
        },
        {
            id: 3,
            label: "Write on events forum",
            badge: "Forum Posts",
            title: "Write on event forum",
            content:
                "Stay informed about events in real-time by accessing live forum from other attendees. This feature enables you to gauge whether an event aligns with your interests and preferences, ensuring that you choose the most suitable events to attend.",
            image: ForumPhone,
        },
        {
            id: 4,
            label: "Host an event",
            badge: "Hosting",
            title: "Be a host and create events",
            content:
                "Empower yourself to create positive change by hosting your own event in our community space. With our user-friendly management platform, organizing and coordinating your event becomes effortless.",
            image: HostingPhone,
        },
    ];

    const handleButtonClick = (id: number) => {
        setSelectedButton(id);
    };

    return (
        <div className="flex flex-wrap gap-10 justify-center mb-10">
            <div className="max-w-[468px] max-h-[519px]">
                <h1
                    className={`${inter.className} text-5xl md:text-6xl font-semibold leading-snug mb-5`}
                >
                    And so much more
                </h1>
                {buttonContentMap.map((content: ButtonContentMap) => (
                    <SelectableButton
                        key={content.id}
                        label={content.label}
                        selected={content.id === selectedButton}
                        onClick={() => handleButtonClick(content.id)}
                    />
                ))}
            </div>
            <DynamicInfo
                badgeLabel={buttonContentMap[selectedButton].badge}
                title={buttonContentMap[selectedButton].title}
                content={buttonContentMap[selectedButton].content}
                image={buttonContentMap[selectedButton].image}
            />
        </div>
    );
};

export default AdditionalInfo;
