import { Arrow } from "@/components/shared/svg/icons";
import { COLORS } from "@/utils/constants/colors";
import { inter } from "@/utils/constants/fonts";
import Link from "next/link";
import { FC } from "react";

interface LocationEntryProps {
    name: string;
    id: string;
    isSubscribed: boolean;
}

const LocationEntry: FC<LocationEntryProps> = ({ name, id, isSubscribed }) => {
    return (
        <Link
            href={`/location/${id}`}
            className={`${inter.className} flex flex-row justify-between items-center border-b-2 py-3 ${
                isSubscribed ? "border-secondary-400" : "border-sky-500"
            } transform hover:scale-105 transition-transform duration-300`}
        >
            <p
                className={`text-xl font-medium ${
                    isSubscribed ? "text-secondary-500" : "text-sky-500"
                }`}
            >
                {name}
            </p>
            <div
                className={`rounded-full border-2 ${
                    isSubscribed ? "border-secondary-500" : "border-sky-500"
                }`}
            >
                <Arrow
                    color={
                        isSubscribed ? COLORS.secondary[500] : COLORS.sky[500]
                    }
                    dimensions={{ width: 20 }}
                />
            </div>
        </Link>
    );
};

export default LocationEntry;
