import { garamond, inter } from "@/utils/constants/fonts";
import { FC } from "react";
import TrackLocationToggle from "./TrackLocationToggle";
import { Switch } from "@/components/shared/elements";
import { useAppContext } from "@/context/AppContext";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
    const { user } = useAppContext();
    return (
        <div className={`${inter.className} max-w-4xl mx-auto mt-20`}>
            <h1
                className={`${inter.className} text-center text-primary-900 leading-snug text-5xl py-5 font-semibold md:leading-snug md:text-6xl lg:text-7xl`}
            >
                {user ? "Subscribe to our" : "Check out our available"}
                <span className={`${garamond.className} italic font-light`}>
                    {" "}
                    Location
                </span>{" "}
                {user && "to get alerted"}
            </h1>
            {user && <TrackLocationToggle />}
        </div>
    );
};

export default Header;
