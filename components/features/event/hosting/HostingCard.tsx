import { inter } from "@/utils/constants/fonts";
import { FC } from "react";

interface HostingCardProps {
    title: string;
    content: string;
    emoji: string;
}

const HostingCard: FC<HostingCardProps> = ({ title, content, emoji }) => {
    return (
        <div
            className={`${inter.className} rounded-2xl bg-white p-5 max-w-[405px] min-h-[216px]`}
        >
            <div className="flex flex-row justify-end items-center">
                <span>{emoji}</span>
            </div>
            <h1 className="text-2xl font-bold pb-2">{title}</h1>
            <p>{content}</p>
        </div>
    );
};

export default HostingCard;
