import { FC } from "react";

interface InfoCardProps {
    title: string;
    content: string;
    number: string;
}

const InfoCard: FC<InfoCardProps> = ({ title, content, number }) => {
    return (
        <div className="border border-black rounded-xl border-1 bg-tertiary-100 max-w-[311px] min-h-[377px] p-5">
            <span className="border-2 border-black w-7 h-7 rounded-full p-2 flex items-center justify-center mb-3">
                {number}
            </span>
            <h1 className="text-xl font-semibold mb-2">{title}</h1>
            <p>{content}</p>
        </div>
    );
};

export default InfoCard;
