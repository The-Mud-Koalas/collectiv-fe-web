import { Button } from "@/components/shared/elements";
import { garamond, inter } from "@/utils/constants/fonts";
import { FC } from "react";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
    return (
        <div className={`${inter.className} text-center p-10`}>
            <h1 className="text-primary-900 text-5xl py-5 font-semibold">
                Subscribe to our{" "}
                <span className={`${garamond.className} italic font-light`}>
                    Location
                </span>{" "}
                to get alerted
            </h1>
            <div className="bg-secondary-200 rounded-2xl p-3 w-[400px] flex flex-row mx-auto">
                <p>📍</p>
                <p className="text-secondary-500 font-semibold">
                    Allow location tracking
                </p>
            </div>
        </div>
    );
};

export default Header;
