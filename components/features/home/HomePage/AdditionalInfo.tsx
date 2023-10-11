import { FC, useState } from "react";
import { inter, garamond } from "@/utils/constants/fonts";
import SelectableButton from "./SelectableButton";
import DynamicInfo from "./DynamicInfo";
interface AdditionalInfoProps {}

const AdditionalInfo: FC<AdditionalInfoProps> = ({}) => {
    const [selectedButton, setSelectedButton] = useState<string | null>(null);

    type ButtonContentMap = {
        [key: string]: string;
    };

    // Define content for each button
    const buttonContentMap: ButtonContentMap = {
        "Event Notification alert": "Content for Event Notification alert",
        "Register as participant or volunteer":
            "Content for Register as participant or volunteer",
        "Attend events and be rewarded":
            "Content for Attend events and be rewarded",
        "Write on events forum": "Content for Write on events forum",
        "Host an event": "Content for Host an event",
        "Seamless event management": "Content for Seamless event management",
    };

    const handleButtonClick = (label: string) => {
        setSelectedButton(label);
    };

    return (
        <div className="flex flex-row gap-20 justify-center">
            <div className="w-[468px]">
                <h1 className={`${inter.className} text-6xl mb-5`}>
                    And so much more`
                </h1>
                <div>
                    {Object.keys(buttonContentMap).map((label) => (
                        <SelectableButton
                            key={label}
                            label={label}
                            selected={label === selectedButton}
                            onClick={() => handleButtonClick(label)}
                        />
                    ))}
                </div>
            </div>
            <DynamicInfo
                badgeLabel={selectedButton || ""}
                title={selectedButton ? buttonContentMap[selectedButton] : ""}
                content={
                    selectedButton
                        ? `Additional content for ${selectedButton}`
                        : ""
                }
            />
        </div>
    );
};

export default AdditionalInfo;
