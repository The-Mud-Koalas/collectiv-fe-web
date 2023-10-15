import { inter } from "@/utils/constants/fonts";
import Image, { StaticImageData } from "next/image";
import { FC } from "react";
interface DynamicInfoProps {
    badgeLabel: string;
    title: string;
    content: string;
    image: StaticImageData;
}

const DynamicInfo: FC<DynamicInfoProps> = ({
    badgeLabel,
    title,
    content,
    image,
}) => {
    return (
        <div
            className={`${inter.className} flex flex-wrap justify-center gap-10 lg:gap-20 items-center rounded-2xl w-[820px] min-h-[532px] border-2 border-black p-10`}
        >
            <div className="max-w-[364px]">
                <span className="bg-primary-300 text-primary-900 rounded-3xl px-3 py-1">
                    {badgeLabel}
                </span>
                <p className="text-2xl font-semibold mt-3 mb-4">{title}</p>
                <p className="text-lg">{content}</p>
            </div>
            <Image
                src={image}
                alt="Description of the image"
                width={254}
                height={478.24}
            />
        </div>
    );
};

export default DynamicInfo;
