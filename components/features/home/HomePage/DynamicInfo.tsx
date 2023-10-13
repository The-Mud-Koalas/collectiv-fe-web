import { FC } from "react";
import { inter, garamond } from "@/utils/constants/fonts";
interface DynamicInfoProps {
    badgeLabel: string;
    title: string;
    content: string;
}

const DynamicInfo: FC<DynamicInfoProps> = ({ badgeLabel, title, content }) => {
    return (
        <div
            className={`${inter.className} flex justify-evenly rounded-2xl w-[820px] h-[532px] border-2 border-black p-7`}
        >
            <div>
                <span className="bg-primary-400 text-primary-900 rounded-3xl px-2">
                    {badgeLabel}
                </span>
                <p className="text-xl">{title}</p>
                <p>{content}</p>
            </div>
        </div>
    );
};

export default DynamicInfo;
