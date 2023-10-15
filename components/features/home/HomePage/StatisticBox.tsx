import { FC } from "react";
import { inter, garamond } from "@/utils/constants/fonts";
import { Calendar } from "@/components/shared/svg/icons";
import { COLORS } from "@/utils/constants/colors";
interface StatisticBoxProps {
    value: string;
    label: string;
}

const StatisticBox: FC<StatisticBoxProps> = ({ value, label }) => {
    return (
        <div
            className={`${inter.className} rounded-lg p-5 bg-white max-w-[442px] max-h-[191px]`}
        >
            <div className="flex justify-end">
                <div className="bg-secondary-200 rounded-full p-3">
                    <Calendar
                        color={COLORS.secondary[500]}
                        dimensions={{ width: 20 }}
                    />
                </div>
            </div>
            <h1 className="text-5xl font-bold">{value}</h1>
            <p className={`${garamond.className} text-2xl`}>{label}</p>
        </div>
    );
};

export default StatisticBox;
