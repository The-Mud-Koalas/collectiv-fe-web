import { FC } from "react";

interface InfoCardProps {
    title: string;
    content: string;
}

const InfoCard: FC<InfoCardProps> = ({ title, content }) => {
    return (
        <div className="border border-black rounded-xl border-1 bg-tertiary-100 w-[311px] h-[377px] p-5">
            <h1 className="text-xl">{title}</h1>
            <p>{content}</p>
        </div>
    );
};

export default InfoCard;
