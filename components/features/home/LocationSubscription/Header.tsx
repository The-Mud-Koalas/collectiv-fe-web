import { garamond, inter } from "@/utils/constants/fonts";
import { FC } from "react";
import TrackLocationToggle from "./TrackLocationToggle";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
    return (
        <div
            className={`${inter.className} text-center max-w-4xl mx-auto mt-20`}
        >
            <h1
                className={`${inter.className} text-primary-900 leading-snug text-4xl py-5 font-semibold md:leading-snug md:text-6xl lg:text-7xl`}
            >
                Subscribe to our{" "}
                <span className={`${garamond.className} italic font-light`}>
                    Location
                </span>{" "}
                to get alerted
            </h1>
            <TrackLocationToggle />
        </div>
    );
};

export default Header;
