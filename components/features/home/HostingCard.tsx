import { FC } from "react";

interface HostingCardProps {
    title: string;
    content: string;
}

const HostingCard: FC<HostingCardProps> = ({ title, content }) => {
    return (
        <div className="rounded-2xl bg-white p-5 w-80 h-40">
            <h1 className="text-2xl font-bold py-2">{title}</h1>
            <p>{content}</p>
        </div>
    );
};

export default HostingCard;
