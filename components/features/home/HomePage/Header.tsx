import { FC } from "react";
import { inter, garamond } from "@/utils/constants/fonts";
import { Button } from "@/components/shared/elements";
interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
    return (
        <div
            className={`${inter.className} text-center p-10 max-w-4xl mx-auto`}
        >
            <h1 className="text-primary-900 py-5 font-semibold md:leading-snug text-4xl md:text-7xl">
                Your sanctuary for{" "}
                <span className={`${garamond.className} italic font-light`}>
                    Community
                </span>{" "}
                events
            </h1>
            <p className="md:text-2xl py-5">
                The platform for you to{" "}
                <span className="bg-secondary-200 ">
                    connect, create, celebrate
                </span>
            </p>
            <div className="flex flex-wrap justify-center gap-3">
                <Button className="border border-primary-800 rounded-full text-primary-800 py-2 min-w-[167px]">
                    View Events
                </Button>
                <Button
                    // disabled={isLoading}
                    type="submit"
                    className="border border-primary-800 bg-primary-800 flex justify-center items-center py-2 min-w-[167px] rounded-full"
                >
                    <p className="text-primary-200">Register Now</p>
                </Button>
            </div>
        </div>
    );
};

export default Header;
