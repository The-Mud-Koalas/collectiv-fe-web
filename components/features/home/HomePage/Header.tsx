import { FC } from "react";
import { inter, garamond } from "@/utils/constants/fonts";
import { Button } from "@/components/shared/elements";
interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
    return (
        <div className={`${inter.className} text-center p-10`}>
            <h1 className="text-primary-900 text-5xl py-5 font-semibold">
                Your sanctuary for{" "}
                <span className={`${garamond.className} italic font-light`}>
                    Community
                </span>{" "}
                events
            </h1>
            <p className="text-2xl py-5">
                The platform for you to{" "}
                <span className="bg-secondary-200 ">
                    connect, create, celebrate
                </span>
            </p>
            <div className="flex flex-row justify-center gap-3">
                <Button className="border border-primary-800 rounded-full text-primary-800 py-2 w-[167px]">
                    View Events
                </Button>
                <Button
                    // disabled={isLoading}
                    type="submit"
                    className="bg-primary-800 flex justify-center items-center py-2 w-[167px] rounded-3xl"
                >
                    <p className="text-primary-200 text-sm">Register Now</p>
                </Button>
            </div>
        </div>
    );
};

export default Header;
